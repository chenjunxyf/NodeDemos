var db = require('../config').db;
var async = require('async');

/**
 * 保存用户
 *
 * @param {Object} list
 * @param {Function} callback
 */
 exports.userList = function(list, callback) {
  async.eachSeries(list, function(item, next) {
    // 查询是否存在
    db.query('SELECT * FROM `user` WHERE `userId`=? LIMIT 1', [item.id], function(err, data) {
      if (err) return next(err);
      if (Array.isArray(data) && data.length >= 1) {
        // 存在，则更新
        db.query('UPDATE `user` SET `userName`=?, `movieUrl`=? WHERE `userId`=?', [item.name, item.url, item.id], next);
      } else {
        // 不存在，则插入
        db.query('INSERT INTO `user`(`userId`, `userName`, `movieUrl`) VALUES(?, ?, ?)', [item.id, item.name, item.url], next);
      }
    });
  }, callback);
 };

 /**
 * 获取用户
 *
 * @param {Function} callback
 */
 exports.getUsers = function(callback) {
  db.query('SELECT * FROM `user`', [], function(err, data) {
    if (err) return callback(err);
    callback(null, data);
  });
 };

 /**
 * 保存电影相关信息
 *
 * @param {Object} list
 * @param {Function} callback
 */
 exports.movieList = function(list, callback) {
  async.eachSeries(list, function(item, next) {
    // 查询是否存在
    db.query('SELECT * FROM `movie` WHERE `userId`=? AND `movieId`=? LIMIT 1', [item.uid, item.mid], function(err, data) {
      if (err) return next(err);
      if (Array.isArray(data) && data.length >= 1) {
        // 存在，则更新
        db.query('UPDATE `movie` SET `score`=? WHERE  `userId`=? AND `movieId`=?', [item.score, item.uid, item.mid], next);
      } else {
        // 不存在，则插入
        db.query('INSERT INTO `movie`(`userId`, `movieId`, `score`, `movieName`) VALUES(?, ?, ?, ?)', [item.uid, item.mid, item.score, item.name], next);
      }
    });
  }, callback);
 };