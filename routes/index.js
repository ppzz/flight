var express = require('express');
var router = express.Router();
var ccap = require("ccap");

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/captcha", function (req, res) {
  var captchaRobot = ccap({offset: 40, quality: 10});
  var captcha = captchaRobot.get();
  var captchaTxt = captcha[0];
  var captchaBuff = captcha[1];
  res.end(captchaBuff.toString("base64"));
});

router.get("/demo/captcha", function(req, res){
  res.render("demo/captcha", {title: "验证码"});
});

module.exports = router;
