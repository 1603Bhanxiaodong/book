define([
    'jquery',
    'hendlebars'
], function ($, Hendlebars) {
    return function (text, data, parent, flag) {
        var compile = Hendlebars.compile(text);
        Hendlebars.registerHelper('finsh', function (items) {
            if (items) {
                return '完结';
            } else {
                return '连载中...';
            }
        });
        // 计算
        Hendlebars.registerHelper('wordcount', function (items) {
            return Math.round(items / 10000);
        });
        if (flag) {
            $(parent).append(compile(data));
        } else {
            $(parent).html(compile(data));
        }
    };
});