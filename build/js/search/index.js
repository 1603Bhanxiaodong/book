define([
    'jquery',
    'temp',
    'lazyload',
    'text!template/sexlist.html'
], function ($, temp, lazyload, sexlist) {
    // 初始化
    $.ajax({
        url: '/api/searchKey',
        dataType: 'json',
        success: render
    });
    function render (data) {
        temp($('.handle').html(), data, '.search-cunt');
    }
    // 本地存储
    var local = window.localStorage;
    var arr = JSON.parse(local.getItem('name')) || [];
    // 历史记录
    temp($('.text').text(), arr, '.history-count');
    // 点击搜索
    $('.btn-search').on('click', function () {
        var inp = $(this).prev();
        var val = inp.val();
        arr.push({
            name: val
        });
        if (val !== '') {
            $.ajax({
                url: '/api/result',
                data: {
                    value: val
                },
                dataType: 'json',
                success: function (data) {
                    if (data.mes === 'success') {
                        temp(sexlist, data.cont, '.search-cunt');
                        $('img.lazy').lazyload({
                            effect: 'fadeIn',
                            container: $('.search-cunt')
                        });
                        $('.history').html('');
                    }
                }
            });
        };
        // 存数据
        local.setItem('name', JSON.stringify(arr));
    });
    $('.search-cunt').on('click', 'dl', function () {
        window.location.href = '../../page/detail.html' + '?id=352876';
    });
});