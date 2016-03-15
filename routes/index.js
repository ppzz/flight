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
        msg: "this is a test aaaaa",
        data: req.body.msg
    });

});

router.post("/fakeErpAppCodeUrl", function (req, res) {
    var data = req.body;
    console.log('-------------------------------------');
    console.log('req for appCode, req.body; ', data);
    console.log('-------------------------------------\n\n');

    var ttl = 120;
    var appCode = "12345678901234567890123456789012";
    var feedback = {
        status: 200,
        msg: 'ok',
        data: {
            appCode: appCode,
            ttl: ttl
        }
    };
    res.json(feedback);
});

router.post('/test/post', function (req, res) {
    var temp = req.body;
    console.log(temp);
    res.json('ok');
});

module.exports = router;
