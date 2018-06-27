var gulp = require('gulp');
var webserver = require('gulp-webserver');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mock = require('./mock/data');
var sass = require('gulp-sass');
var text = require('./mock/text.json').userInfo;
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var es5 = require('gulp-babel');
// 编译sass
gulp.task('sass', function () {
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});

// 实时监听
gulp.task('change', function () {
    gulp.watch('src/scss/*.scss', ['sass']);
});

// 起服务
gulp.task('devserver', function () {
    gulp.src('src')
        .pipe(webserver({
            port: 6060,
            open: true,
            middleware: function (req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    // 判断注册接口
                    if (pathname === '/api/reglogin') {
                        var objarr = [];
                        req.on('data', function (chunk) {
                            objarr.push(chunk);
                        });
                        req.on('end', function () {
                            var objData = require('querystring').parse(Buffer.concat(objarr).toString());
                            text.push(objData);
                            var objUserInfo = {
                                userInfo: text
                            };
                            fs.writeFileSync('./mock/text.json', JSON.stringify(objUserInfo));
                        });
                        return false;
                    } else if (pathname === '/api/login') {
                        var objarr = [];
                        req.on('data', function (chunk) {
                            objarr.push(chunk);
                        });
                        req.on('end', function () {
                            var objData = require('querystring').parse(Buffer.concat(objarr).toString());
                            var result = text.some(function (v) {
                                return v.user === objData.user && v.pwd === objData.pwd;
                            });
                            if (result) {
                                res.end('{"code": 1, "mes": "success"}');
                            } else {
                                res.end('{"code": 0, "mes": "用户不存在,请注册"}');
                            }
                        });
                        return false;
                    }
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }));
});
gulp.task('dev', ['sass', 'change', 'devserver']);

// 线上服务
gulp.task('buildserver', function () {
    gulp.src('build')
        .pipe(webserver({
            port: 6060,
            middleware: function (req, res, next) {
                if (req.url === '/favicon.ico') {
                    return false;
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? '/index.html' : pathname;
                if (/\/api\//.test(pathname)) {
                    // 判断注册接口
                    if (pathname === '/api/reglogin') {
                        var objarr = [];
                        req.on('data', function (chunk) {
                            objarr.push(chunk);
                        });
                        req.on('end', function () {
                            var objData = require('querystring').parse(Buffer.concat(objarr).toString());
                            text.push(objData);
                            var objUserInfo = {
                                userInfo: text
                            };
                            fs.writeFileSync('./mock/text.json', JSON.stringify(objUserInfo));
                        });
                        return false;
                    } else if (pathname === '/api/login') {
                        var objarr = [];
                        req.on('data', function (chunk) {
                            objarr.push(chunk);
                        });
                        req.on('end', function () {
                            var objData = require('querystring').parse(Buffer.concat(objarr).toString());
                            var result = text.some(function (v) {
                                return v.user === objData.user && v.pwd === objData.pwd;
                            });
                            if (result) {
                                res.end('{"code": 1, "mes": "success"}');
                            } else {
                                res.end('{"code": 0, "mes": "用户不存在,请注册"}');
                            }
                        });
                        return false;
                    }
                    res.end(JSON.stringify(mock(req.url)));
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, 'build', pathname)));
                }
            }
        }));
});
gulp.task('htmlmin', function () {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            removeComments: true, // 清除HTML注释
            collapseWhitespace: true // 压缩HTML
        }))
        .pipe(gulp.dest('build'));
});
gulp.task('minjs', function () {
    gulp.src('./src/js/**/*.js')
        .pipe(gulp.dest('build/js'));
});
gulp.task('build', ['sass', 'change', 'htmlmin', 'minjs', 'buildserver']);