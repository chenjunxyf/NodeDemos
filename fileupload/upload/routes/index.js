var express = require('express');
var router = express.Router();

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

/* GET node-iframe page. */
router.get('/node-iframe', function(req, res, next) {
  res.render('node-iframe', { title: 'node-iframe' });
});

/* GET node-ajax page. */
router.get('/node-ajax', function(req, res, next) {
  res.render('node-ajax', { title: 'node-ajax' });
});

/* handle file upload */
router.post('/file-upload/:way', function(req, res, next) {
  var form = new multiparty.Form({ uploadDir: './uploadDir/'});
  form.parse(req, function(err, fields, files) {
    console.log(files);     // 文件信息
    console.log(fields);  // 普通信息
    if (err) {
      console.log('parser error : ' + err);
    } else {
      // 考虑多文件上传
      for (var p in files) {
        var file = files[p];
        if (file[0].size == 0) continue;
        var uploadedPath = file[0].path;
        var dstPath = './uploadDir/' + file[0].originalFilename;
        fs.rename(uploadedPath, dstPath, function(err) {
          if (err) {
            console.log('rename error : ' + err);
          } else {
            console.log('rename ok!');
          }
        });
      }
    }

    // 不同的请求方式，不同的返回
    var way = req.params.way;
    if (way === 'iframe') {
      res.writeHead(200, {'content-type': 'text/html'});
      res.write("<script>parent.callback('success!!!');</script>");
    } else if (way === 'ajax') {
      res.writeHead(200, {'content-type': 'text/plain'});
    }
    res.end();
  });

  return;
});


module.exports = router;
