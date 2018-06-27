define([
    'jquery',
    'base64',
    'temp',
    'getUrl'
], function ($, base64, temp, getUrl) {
    var age = getUrl('age');
    function getxt () {
        $.ajax({
            url: '/api/text' + age,
            dataType: 'json',
            success: function (data) {
                Jsonp(data.jsonp, function (data) {
                    var text = $('.texts').html();
                    var obj = JSON.parse($.base64('decode', data, true));
                    temp(text, obj, '.article');
                });
            }
        });
    };
    getxt();

    // 封装jsonp 跨域请求
    function Jsonp (url, success) {
        var script = document.createElement('script');
        window['duokan_fiction_chapter'] = function (data) {
            success(data);
            document.head.removeChild(script);
        };
        script.src = url;
        document.head.appendChild(script);
    };

    // 显示隐藏
    $('.article').on('click', function () {
        $('.mask').toggle();
    });
    // 总章节
    var chageId = getUrl('chageId');
    $('.zhon').html(chageId);
    // 分页
    $('.fen').html(age);
    // 下一章
    $('.downChapter').on('click', function () {
        age++;
        getxt();
        $('.fen').html(age);
    });
    // 上一章
    $('.onChapter').on('click', function () {
        age--;
        age = age <= 1 ? 1 : age;
        getxt();
        $('.fen').html(age);
    });
    // 目录
    $('.mulu').on('click', function () {
        window.location.href = '../../page/mulu.html?active=76&page=' + age;
    });
    // 字体
    $('.ziti').on('click', function () {
        $('.bian').toggle();
    });
    // 获取字体
    var local = window.localStorage;
    var fontSize = local.getItem('fontSize') || 30;
    $('.wrap').css('fontSize', fontSize * 1);

    fontSize = parseInt($('.wrap').css('font-size'));
    // 字体变大
    $('.jia').on('click', function () {
        $('.wrap').css('fontSize', ++fontSize);
        local.setItem('fontSize', fontSize);
    });
    // 字体变小
    $('.jiang').on('click', function () {
        $('.wrap').css('fontSize', --fontSize);
        local.setItem('fontSize', fontSize);
    });
});
