define([
    'jquery',
    'getUrl',
    'temp',
    'text!template/detail.html'
], function ($, getUrl, temp, detail) {
    var $id = getUrl('id');
    $.ajax({
        url: '/api/detail?id=' + $id,
        dataType: 'json',
        success: function (data) {
            console.log(data.item);
            temp(detail, data.item, '.main');
        }
    });
    // 点击开始阅读跳转阅读页
});