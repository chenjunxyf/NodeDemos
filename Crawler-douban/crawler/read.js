var originRequest = require('request');
var cheerio = require('cheerio');
var conf = require('../config.js');


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
exports.userList = function(url, callback) {

  // url请求
  request(url, function(err, res) {
    // 异常退出
    if (err || res.statusCode !== 200) {
     console.error(err || res.statusCode);
     return callback(err || res.statusCode);
   }
     // 用户信息存储
    var users = [];
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
    }); // each

    //下一页的URL
    var nextUrl = $('.next a').attr('href');
    // 返回结果
    callback(null, users, nextUrl);
  }); // request
};

/**
 * 获取某个用户的电影评分记录
 *
 * @param {String} uid
 * @param {Function} callback
 */
exports.movieList = function(url, callback) {
  request(url, function(err, res) {
    // 异常退出
    if (err || res.statusCode !== 200) {
      console.error(err || res.statusCode);
      return callback(err || res.statusCode);
    }

    // 电影信息信息存储
    var movies = [];
    // 根据网页内容创建DOM操作对象
    var $ = cheerio.load(res.body.toString());

    // 获取电影列表
    $('.grid-view .item .info').each(function() {
      var $me = $(this);
      var item = {};

      var uid = url.match(/^.+\/(\d+)\/collect.*$/)[1];
      var name = $me.find('em').text().trim();
      // 从span标签中获取评分
      var score = '';
      $me.find('span').each(function(i, elem) {
        var c = $(this).attr('class');
        if (c.indexOf('rating') !== -1) {
          score = c.match(/rating(\d)-t/)[1];
        }
      });
      var s = $me.find('a').attr('href').match(/^.+\/(\d+)\/$/);
      if (Array.isArray(s)) {
        item.uid = uid;
        item.mid = s[1];
        item.score = score;
        item.name = name;
        movies.push(item);
      }
    });

    // 获取下一页的url
    var nextUrl = $('.next a').attr('href');

    callback(null, movies, nextUrl);
  }); // request
};