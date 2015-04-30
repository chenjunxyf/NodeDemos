var async = require('async');
var conf = require('../config');
var read = require('./read');
var db = require('./db');

// 用户列表
var userList;
async.series([
    function(done) {
      db.getUsers(function(err, users) {
        userList = users;
        done(err);
      });
    }
  ], function(err) {
    if (err) console.error(err.stack);

    // 用户个数
    var userCount = userList.length;
   // 用户索引
    var index = 0;
    // 抓取url
    var url = userList[0].movieUrl;

    // 间隔抓取
    var timer = setInterval(function() {
      console.log(url);

      var movieList; // 电影信息
      async.series([

          // 获取电影信息
          function(done) {
            read.movieList(url, function(err, movies, nextUrl) {
              if (err) console.error(err.stack);
              movieList = movies;
              url = nextUrl;
              done(err);
            });
          },

          // 存储电影信息
          function(done) {
            db.movieList(movieList, done);
          }

        ], function(err) {
          if (err) console.error(err.stack);
          if (url === undefined) {
            if (index < userCount - 1) url = userList[++index].movieUrl;
            else {
              clearInterval(timer);
              process.exit(0);
            }
          }
      });
    }, 3000);
  });
