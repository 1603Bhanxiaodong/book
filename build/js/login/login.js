define([
    'jquery'
], function ($) {
    // 小眼睛
    $('.yj').on('click', function () {
        $('.pwd').toggleClass('active');
        if ($('.pwd').hasClass('active')) {
            $('.pwd').attr('type', 'text');
            $(this).css({
                color: '#000'
            });
        } else {
            $('.pwd').attr('type', 'password');
            $(this).css({
                color: '#ccc'
            });
        }
    });
    // 点击登录注册
    $('button').on('click', function () {
        // 手机号和密码非空验证
        var phone = $('.phone');
        var pwd = $('.pwd');
        if (!phone.val() || !pwd.val()) {
            errorMes = '请输入用户或密码';
            window.alert(errorMes);
        } else if (!(phone.val().length > 5 && phone.val().length < 10)) {
            // 判断手机号的个数
            errorMes = '手机号输入5-10位数字';
            window.alert(errorMes);
        } else {
            // 判断点击是登录还是注册
            if ($(this).hasClass('log')) {
                // 登录
                $.ajax({
                    url: '/api/login',
                    type: 'post',
                    data: {
                        user: phone.val(),
                        pwd: pwd.val()
                    },
                    success: function (data) {
                        var obj = JSON.parse(data);
                        window.alert(obj.mes);
                        if (obj.mes === 'success') {
                            window.history.go(-1);
                        }
                    }
                });
            } else {
                // 注册
                $.ajax({
                    url: '/api/reglogin',
                    type: 'post',
                    data: {
                        user: phone.val(),
                        pwd: pwd.val()
                    },
                    success: function (data) {
                        var obj = JSON.parse(data);
                        window.alert(obj.mes);
                    }
                });
            }
        };
    });
});