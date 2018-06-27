var home = require('./home');
var page1 = require('./recommend1');
var page2 = require('./recommend2');
var page3 = require('./recommend3');
var searchKey = require('./searchKey');
var searchResult = require('./search');
var detail = require('./xianqing/352876');
var mulu = require('./list/chapter-list');
var data1 = require('./data/data1');
var data2 = require('./data/data2');
var data3 = require('./data/data3');
var data4 = require('./data/data4');
var obj = {
    '/api/index': home,
    '/api/loadmore?pagenum=1&limit=20': page1,
    '/api/loadmore?pagenum=2&limit=20': page2,
    '/api/loadmore?pagenum=3&limit=20': page3,
    '/api/bookself': page1,
    '/api/searchKey': searchKey,
    '/api/detail?id=352876': detail,
    '/api/mulu?active76': mulu,
    '/api/text1': data1,
    '/api/text2': data2,
    '/api/text3': data3,
    '/api/text4': data4
};
module.exports = function (url) {
    // 修改数据
    if (/\/api\/result/.test(url)) {
        var n = url.split('?')[1];
        var val = decodeURIComponent(n.split('=')[1]);
        var reg = new RegExp(val, 'g');
        var dataObj = {
            mes: '暂无数据',
            cont: []
        };
        var newArr = searchResult.items.filter(function (v, i) {
            v.authors = v.role[0][1];
            v.summary = v.intro;
            return reg.test(v.title) || reg.test(v.intro) || reg.test(v.role[0][1]);
        });
        if (newArr.length) {
            dataObj.mes = 'success';
            dataObj.cont = newArr;
        };
        return dataObj;
    };
    return obj[url];
};