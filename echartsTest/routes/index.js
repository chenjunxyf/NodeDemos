var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/relation', function(req, res) {
  res.render('simple-relation');
});

router.get('/petri', function(req, res) {
  res.render('petri');
});

module.exports = router;
