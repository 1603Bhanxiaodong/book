>项目介绍
-----------------
    读书在小米 创作无极限 —— 这个口号一直是起点众多玄幻、魔幻、武侠、军文小说作者的创作目标，严谨的写作态度，锲而不舍的求新求变，与书友的直接沟通交流修改，从而起点中文网拥有国内很多具有一流水平的原创作品，使书友得以在第一时间阅读到作者连载的好书佳作。

>技术栈
-----------------
gulp + require + handlebars + ES6/7 + ajax + sass + flex + canvas + 懒加载

>项目运行

git clone git@github.com:typeofYh/6bookcity.git

npm install --save-dev

npm run build


>书城目录
-----------------


book

    |———mock
    |——————data
    |——————list
    |——————xianqing
    |——————data.js
    |--src
    |——————css
    |————————————common.css
    |————————————detail.css
    |————————————mulu.css
    |————————————search.css
    |————————————style.css
    |————————————swiper.css
    |————————————login.css
    |————————————search.css
    |————————————yuedu.css      
    |——————fonts
    |——————img
    |--js
    |——————conmon
    |————————————getUrl.js
    |————————————temp.js
    |——————detail
    |————————————index 
    |——————lib
    |————————————flexible.js
    |————————————handlebaes.js
    |————————————jquery.base64.js
    |————————————jquery.js
    |————————————jquery.lazyload.js
    |————————————require.js
    |————————————require.text.js
    |————————————swiper.js
    |————————————zepto.js
    |——————login
    |————————————login.js
    |——————mulu
    |————————————mulu.js
    |——————page
    |————————————index.js
    |——————search
    |————————————index.js
    |——————yuedu
    |————————————index.js
    |——————main.js
    |--page
    |————————————detail.html
    |————————————login.html
    |————————————mulu.html
    |————————————search.html
    |————————————yuedu.html
    |--scss
    |--template
    |————————————block-list.html
    |————————————detail.html
    |————————————index.html
    |————————————list.html
    |————————————mulu.html
    |————————————sexlist.html
    |————————————zhonban.html
    |--index.html
    gulpfile.js