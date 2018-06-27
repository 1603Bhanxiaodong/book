define([
    'jquery',
    'swiper',
    'temp',
    'lazyload',
    'text!template/index.html',
    'text!template/block-list.html',
    'text!template/list.html',
    'text!template/zhonban.html',
    'text!template/sexlist.html'
], function ($, Swiper, temp, lazyload, str, block, countList, zhonban, sexlist) {
    $('.header p').on('click', function () {
        var ind = $(this).index() - 1;
        $(this).addClass('borderColor').siblings().removeClass('borderColor');
        $('.scollTwo').css({
            transform: 'translateX(-' + ind * 100 + '%)'
        });
    });
    // 书架
    $.ajax({
        url: '/api/bookself',
        dataType: 'json',
        success: initBookSelf
    });
    function initBookSelf (data) {
        temp(block, data.items, '.book-self>div');
        $('img.lazy').lazyload({
            effect: 'fadeIn',
            container: $('.twoRigth')
        });
        // 点击切换格式
        $('.self-btn').on('click', function () {
            if ($(this).children('img').attr('src') === './img/b7UfAdlfufQKML.png') {
                $(this).children('img').attr('src', 'http://image.read.duokan.com/mfsv2/download/fdsc3/p014nDc0lHYW/lDeZ3lL4nmgnmf.png');
                temp(sexlist, data.items, '.book-self>div');
                $('img.lazy').lazyload({
                    effect: 'fadeIn',
                    container: $('.twoRigth')
                });
            } else {
                $(this).children('img').attr('src', './img/b7UfAdlfufQKML.png');
                temp(block, data.items, '.book-self>div');
                $('img.lazy').lazyload({
                    effect: 'fadeIn',
                    container: $('.twoRigth')
                });
            }
        });
    };
    // 书城
    $.ajax({
        url: '/api/index',
        dataType: 'json',
        success: initBook
    });
    function initBook (data) {
        temp(str, data.items[0].data, '.swiperlist');
        var mySwiper = new Swiper('.parent', {
            loop: true,
            autoplay: true
        });
        // list全部
        temp(countList, data.items[1], '.Alist');
        // 本周最火
        temp(block, data.items[1].data.data, '.week-not-cunt');
        data.items[5].data.data.map(function (v) {
            v.title = v.data.title;
            v.cover = v.data.cover;
            v.fiction_id = v.data.fiction_id;
        });

        // 限时免费
        temp(block, data.items[5].data.data, '.time-free-cunt');

        // 重磅推荐
        var index = 0;
        temp(zhonban, changedata(index, data.items[2].data.data), '.recommend-count');

        // 女生最爱
        temp(sexlist, changedata(index, data.items[3].data.data), '.gril-cont');

        // 男生最爱
        temp(sexlist, changedata(index, data.items[4].data.data), '.boy-cont');

        // 上拉加载
        loadMore('.twoLeft');
        // 图片懒加载
        $('img.lazy').lazyload({
            effect: 'fadeIn',
            container: $('.twoLeft')
        });
        // 换一换
        $('.huan').on('click', function () {
            var index = $(this).data('id') * 1;
            var ind = $(this).attr('data');// 234
            var obj = data.items[ind];
            index++;
            index = index % (obj.data.count / 5);
            var str = ind == 2 ? zhonban : sexlist;
            $(this).data('id', index);
            temp(str, changedata(index, obj.data.data), '.' + $(this).parent('p').prev().attr('class'));
        });
    };

    function changedata (ind, arr) {
        var limit = 5;
        var startind = ind * limit;
        var endind = ind * limit + limit;
        var newarr = arr.slice(startind, endind);
        newarr.map(function (v, i) {
            v.count = i + 1;
        });
        return newarr;
    }
    // 上拉加载
    var pagenum = 0;
    function loadMore (parent) {
        if (pagenum >= 3) {
            $('.loading').html('暂无更多数据');
            return false;
        }
        var clientH = $(parent).height();
        $(parent).on('scroll', function () {
            // 最大滚动距离
            var maxH = $(this).children().height() - clientH;
            if ($(this).scrollTop() + 30 >= maxH) {
                // 卸载事件
                $(this).off('scroll');
                pagenum++;
                render(pagenum);
            }
        });
    };
    function render (n) {
        $.ajax({
            url: '/api/loadmore',
            data: {
                pagenum: n,
                limit: 20
            },
            dataType: 'json',
            success: function (data) {
                temp(sexlist, data.items, '.load-cont-list', 1);
                loadMore('.twoLeft');
                $('img.lazy').lazyload({
                    effect: 'fadeIn',
                    container: $('.twoLeft')
                });
            }
        });
    };
    // 跳转登录页面
    $('.login').on('click', function () {
        window.location.href = '../../page/login.html';
    });
});