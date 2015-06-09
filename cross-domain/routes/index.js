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

router.get('/document_iframe', function(req, res) {
  res.render('document-domain/document_iframe');
});

/* url-hash Test */
router.get('/url_hash_test', function(req, res) {
  res.render('url-hash/url_hash_test');
});

router.get('/hash_iframe', function(req, res) {
  res.render('url-hash/hash_iframe');
});

/* cross-fragment Test */
router.get('/cross_fragment_test', function(req, res) {
  res.render('cross-fragment/cross_fragment_test');
});

router.get('/fragment_iframe', function(req, res) {
  res.render('cross-fragment/fragment_iframe');
});

router.get('/fragment_req_proxy', function(req, res) {
  res.render('cross-fragment/fragment_req_proxy');
});

router.get('/fragment_res_proxy', function(req, res) {
  res.render('cross-fragment/fragment_res_proxy');
});

/* window-name Test */
router.get('/window_name_test', function(req, res) {
  res.render('window-name/window_name_test');
});

router.get('/window_iframe', function(req, res) {
  res.render('window-name/window_iframe');
});

/* postMessage Test */
router.get('/postMessage_test', function(req, res) {
  res.render('postMessage/postMessage_test');
});

router.get('/postMessage_iframe', function(req, res) {
  res.render('postMessage/postMessage_iframe');
});

module.exports = router;
