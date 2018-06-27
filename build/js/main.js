require.config({
    baseUrl: '/js/',
    paths: {
        jquery: 'lib/jquery',
        flexible: 'lib/flexible',
        index: 'page/index',
        zepto: 'lib/zepto',
        swiper: 'lib/swiper-4.2.2.min',
        text: 'lib/require.text',
        template: '../template/',
        hendlebars: 'lib/handlebars-v4.0.11',
        temp: 'conmon/temp',
        lazyload: 'lib/jquery.lazyload',
        search: 'search/index',
        detail: 'detail/index',
        getUrl: 'conmon/getUrl',
        mulu: 'mulu/mulu',
        yuedu: 'yuedu/index',
        base64: 'lib/jquery.base64',
        login: 'login/login'
    },
    shim: {
        lazyload: {
            exports: 'lazyload',
            deps: ['jquery']
        },
        base64: {
            exports: 'base64',
            deps: ['jquery']
        }
    }
});
require(['flexible']);