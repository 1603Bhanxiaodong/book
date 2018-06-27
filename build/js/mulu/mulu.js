define([
    'jquery',
    'temp',
    'getUrl',
    'text!template/mulu.html'
], function ($, temp, getUrl, mulu) {
    var $active = getUrl('active');
    var $page = getUrl('page');
    $.ajax({
        url: '/api/mulu?active' + $active,
        dataType: 'json',
        success: function (data) {
            temp(mulu, data.item.toc, '.ul-list');
            $.each($('.ul-list ul li'), function () {
                if ($(this).data('id') == $active) {
                    $(this).addClass('active');
                }
            });
            $('.ul-list').on('click', 'li', function () {
                $(this).addClass('active').siblings().removeClass('active');
            });
        }
    });
    // 点击目录分页
    $('.ul-list').on('click', 'li', function () {
        var ind = $(this).data('id');
        window.location.href = '../../page/yuedu.html?chageId=44&age=' + ind;
    });
    // 滚动
});