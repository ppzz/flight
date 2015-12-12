var express = require('express');
var router = express.Router();
var ccap = require("ccap");

router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get("/captcha", function (req, res) {
    var captchaRobot = ccap({offset: 40, quality: 10});
    var captcha = captchaRobot.get();
    var captchaTxt = captcha[0];
    var captchaBuff = captcha[1];
    res.end(captchaBuff.toString("base64"));
});

router.get("/demo/captcha", function (req, res) {
    res.render("demo/captcha", {title: "验证码"});
});

router.post("/fakeErpMsgUrl", function (req, res) {
    var data = req.body;
    console.log('-------------------------------------');
    console.log('req for api,  req.body:', data);
    console.log('-------------------------------------\n\n');

    res.json({
        status: 200,
        msg: "this is a test",
        data: req.body.msg
    });

});

router.post("/fakeErpAppCodeUrl", function (req, res) {
    var data = req.body;
    console.log('-------------------------------------');
    console.log('req for appCode, req.body; ', data);
    console.log('-------------------------------------\n\n');

    var ttl = 120;
    var appCode = "1234567890123";

    res.json(
        {
            ttl: ttl,
            appCode: appCode
        }
    );
});


module.exports = router;
