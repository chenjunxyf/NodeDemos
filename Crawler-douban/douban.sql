/*
Navicat MySQL Data Transfer

Source Server         : zyrf
Source Server Version : 50529
Source Host           : 10.103.242.129:3306
Source Database       : douban

Target Server Type    : MYSQL
Target Server Version : 50529
File Encoding         : 65001

Date: 2015-05-04 15:24:25
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for movie
-- ----------------------------
DROP TABLE IF EXISTS `movie`;
CREATE TABLE `movie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `movieId` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `movieName` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=616 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `movieUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3111 DEFAULT CHARSET=utf8;
