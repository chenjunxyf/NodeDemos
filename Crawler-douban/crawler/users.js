var async = require('async');
var conf = require('../config');
var read = require('./read');
var db = require('./db');


var count = 0; // 记录抓取的用户数
var url = conf.douban.groupUrl; // 爬取的URL

var timer = setInterval(function() {

  console.log(url);

  var userList; // 用户信息暂存区
  async.series([

      // 获取小组成员列表
      function(done) {
        read.userList(url, function(err, list, nextUrl) {
          userList = list;
          url = nextUrl;
          done(err);
        });
      },

      // 存储小组成员
      function(done) {
        db.userList(userList, done);
      }

    ], function(err) {
      if (err) console.error(err.stack);

      // 检查已经抓取的用户个数
      count += userList.length;
      // 抓取1000+个用户
      if (count > 1000 || url === undefined) {
        console.log(count + 'users has been grabbed!');
        clearInterval(timer);
        process.exit(0);
      }
  });
}, 2000);