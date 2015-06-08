var express = require('express');
var router = express.Router();

/* JSONP Test */
router.get('/jsonp_test', function(req, res) {
  res.render('jsonp/jsonp_test');
});

router.get('/jsonp_data', function(req, res) {
  var callback = req.query.callback;
  var data = { name: "chenjun", age: "25" };
  var str =  callback + '(' + JSON.stringify(data) + ')'; //jsonp
  res.end(str);
});

/* CORS Test */
router.get('/cors_test', function(req, res) {
  res.render('cors/cors_test');
});

router.get('/cors_data', function(req, res) {
  var data = { name: "chenjun", age: "25" };
  // 设置响应头
  res.set('Access-Control-Allow-Origin', '*');
  res.end(JSON.stringify(data));
});

/* document-domain Test */
router.get('/document_domain_test', function(req, res) {
  res.render('document-domain/document_domain_test');
});

router.get('/test_iframe', function(req, res) {
  res.render('document-domain/test_iframe');
});


module.exports = router;
