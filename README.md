# NodeDemos

> 该仓库用于存放Node相关的demo

## iframe-self-adaption

iframe自适应，同域和跨域下实现

## fileupload

利用Express4.12.1框架 + multiparty工具包实现了Node下的文件无刷新上传功能

* 利用iframe实现
* 利用ajax实现

## 豆瓣爬虫（crawler-douban）

利用nodejs实现一个豆瓣的爬虫，使用到的工具包：

* [cheerio](https://github.com/cheeriojs/cheerio "cheerio")
* [async](https://github.com/caolan/async "async")
* [mysql](https://github.com/felixge/node-mysql "mysql")
* [request](https://github.com/request/request "request")

**遇到的问题：**

1） 某些网页不让爬取

解决方法：设置合理的`User-Agent`，模仿浏览器行为

2）有的用户没有id，直接就是一个个性域名

解决方法：舍弃

3）抓取太频繁，被封号！服务器返回403

利用`setInterval()`函数，设置合理的抓取间隔

## echarts的简单使用（echartsTest）

nodejs+express+[echarts](http://echarts.baidu.com/index.html "Echarts")

## 跨终端Web实例（cross-terminal）

实例来自鬼道师兄的《夸终端Web》

测试URL：

* http://localhost:3000/proxy/WindowsPhone?url=http://www.tmall.com
* http://localhost:3000/proxy/iphone?url=http://www.tmall.com
* http://localhost:3000/proxy/ipad?url=http://www.tmall.com

## 多种跨域的具体实现（cross-domain）

* jsonp
* cors
* document.domain
* URL.hash
* cross-fragment
* window.name
* postMessage