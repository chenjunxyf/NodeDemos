var async = require('async');
var conf = require('../config');
var read = require('../crawler/read');
var db = require('../crawler/db');

var url = 'http://movie.douban.com/people/1068202/collectxxxxxxxx';

var timer = setInterval(function() {
console.log(url);

  var movieList; // 电影信息
  async.series([

      // 获取电影信息
      function(done) {
        read.movieList(url, function(err, movies, nextUrl) {
          if (err) console.error(err);
          movieList = movies;
          url = nextUrl;
          done(err);
        });
      }

      // 存储电影信息
/*      function(done) {
        db.movieList(movieList, done);
      }
*/
    ], function(err) {
      if (err) console.error(err);
      console.log(movieList.length);
      //if (url === undefined) {
        clearInterval(timer);
        process.exit(0);
      //}
  });
}, 2000);