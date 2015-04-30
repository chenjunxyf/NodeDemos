var originRequest = require('request');
var cheerio = require('cheerio');
var db = require('../crawler/db');
var conf = require('../config');

/**
 * 请求指定URL
 *
 * @param {String} url
 * @param {Function} callback
 */
function request(url, callback) {
  originRequest({
    url: url,
    method: 'GET',
    headers: {
       'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.11 Safari/537.36'
      // 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko'
    }
  }, callback);
}


/**
 * 豆瓣小组所有成员管理主页
 *
 * @param {String} url
 * @param {Function} callback
 */

var count = 0; // 记录抓取的用户数
var url = conf.douban.groupUrl; // 爬取的URL

/* 定时器 */
var timer = setInterval(function() {
  // 用户信息存储
  var users = [];
  // url请求
  request(url, function(err, res) {
    // 异常退出
    if (err || res.statusCode !== 200) {
     console.error(err || res.statusCode);
     clearInterval(timer);
     return;
   }

    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 读取成员列表
    $('.member-list .name a').each(function() {
      var $me = $(this);
      var item = {
        name: $me.text().trim()
      };

      // 从URL中提取用户ID
      var s = $me.attr('href').match(/^.+\/(\d+)\/$/);
      if (Array.isArray(s)) {
        item.id = s[1];
        item.url = conf.douban.movieUrl.replace(/\?/, s[1]);
        users.push(item);
      }
    });

    // 数据库存储
    db.userList(users, function(err) {
      if (err) {
        console.error(err);
        clearInterval(timer);
        return;
      }
    });

    // 检查已经抓取的用户个数
    count += users.length;
    url = $('.next a').attr('href');
    if (count > 100 || url === undefined) {
      console.log(count + 'users has been saved!');
      clearInterval(timer);
    }
  }); // request
}, 1000);
