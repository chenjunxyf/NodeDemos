// 数据库连接配置
var mysql = require('mysql');
exports.db = mysql.createConnection({
  host: '10.103.242.129',
  port: '3306',
  database: 'douban',
  user: 'root',
  password: 'zyrf123'
});
// 豆瓣小组'《看电影》'成员管理主页
exports.douban = {
  groupUrl: 'http://www.douban.com/group/movie_view/members',
  movieUrl: 'http://movie.douban.com/people/?/collect'
};