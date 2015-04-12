var multiparty = require('multiparty');
var http = require('http');
var fs = require('fs');
var util = require('util');

http.createServer(function(req, res) {
  if (req.url === '/upload' && req.method === 'POST') {

    var form = new multiparty.Form({ uploadDir: './uploadDir/'});

    form.parse(req, function(err, fields, files) {
      var filesTmp = JSON.stringify(files, null, 2);
      console.log('parse files : ' + filesTmp);
      if (err) {
        console.log('parser error : ' + err);
      } else {
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

      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({ fields: fields, files: files }));
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload1" multiple="multiple"><br>'+
    '<input type="file" name="upload2" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );
}).listen(8080);