var http = require("http");
var fs = require("fs");
var url = require("url");

CONTENT_TYPE = {
    css: 'text/css',
    gif: 'image/gif',
    html: 'text/html',
    jpe: 'image/jpeg',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    js: 'application/x-javascript',
    png: 'image/png',
    text: 'text/plain'
};

exports.start = function() {
  http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var ext = pathname.match(/\.[^\.]+$/)[0];
    // 浏览器有默认请求ico的操作
    if (ext !== ".ico") {
      fs.readFile("." + request.url, "binary", function(err, data) {
        if (err) throw err;
        response.writeHead(200, {"Content-Type": CONTENT_TYPE[ext]});
        response.write(data, "binary");
        response.end();
      });
    }
  }).listen(8887);
  console.log("server 8887 start!!!");
};