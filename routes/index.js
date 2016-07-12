var express = require('express');
var router = express.Router();
var ccap = require("ccap");
var fs = require("fs");
var path = require("path");
var formidable = require("formidable");
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

router.get("/demo/socket", function (req, res) {
    res.render("demo/socket", {title: "socket"});
});

router.get("/demo/upload", function (req, res) {
    res.render("demo/upload", {title: "upload"});
});

router.post("/demo/upload", function (req, res) {
    var now = new Date();

    var filesize = 7 * 1024 * 1024;
    var fileType = '';
    var dir = "static/upload/image/" + now.toLocaleDateString() +'/' + now.getHours();
    var cachePath = "static/upload/cache/";


    mkdir(dir, function (error) {
        if (error) {
            console.log(error);
            return;
        }

        var form = new formidable.IncomingForm();
        form.encoding = "UTF-8";
        form.uploadDir = cachePath;
        form.keepExtensions = true;
        form.maxFieldsSize = filesize;
        form.parse(req, function (error, fields, files) {
            if (error) {
                console.log(error);
            }
            // console.log(files);

            var fileName = files.upload.name;
            var nameArray = fileName.split(',');
            var type = nameArray[nameArray.length - 1];
            var name = '';
            for (var i =0;i<nameArray.length- 1; i++ ){
                name = name + nameArray[i];
            }
            var timeStamp = new Date().getTime();

            var avatarName = name + timeStamp + "." + type;
            var newPath = dir + "/" + avatarName;
            fs.rename(files.upload.path, newPath, function (error, result) {
                if (error) {
                    return console.log("error in rename file ");
                }
                console.log('ok   success rename file ');
                res.json({
                    status: 200,
                    msg:'收到上传数据',
                    data:{
                        url:newPath
                    }
                });
            });
        });




    });




    //
    // var now = new Date();
    //
    // var filesize = 7 * 1024 * 1024;
    // var fileType = '';
    // var dir = "static/upload/image/" + now.toLocaleDateString() +'/' + now.getHours();
    // var cachePath = "static/upload/cache/";
    //
    //
    // mkdir(dir, function (error) {
    //     if (error) {
    //         console.log(error);
    //         return ;
    //     }
    //
    //     var form = new formidable.IncomingForm();
    //     form.encoding = "UTF-8";
    //     form.uploadDir = cachePath;
    //     form.keepExtensions = true;
    //     form.maxFieldsSize = filesize;
    //
    //     console.log(req.files);
    //
    //     console.log(Object.keys(req));
    //     form.parse(req, function (error, fields, files) {
    //         if (error) {
    //             console.log(error);
    //             console.log('----------------');
    //         }
    //
    //
    //         console.log(files);
    //         console.log('--------------------------------------------------------');
    //
    //
    //
    //         var fileName = files.upload.name;
    //         var nameArray = fileName.split(',');
    //         var type = nameArray[nameArray.length - 1];
    //         var name = '';
    //         for (var i =0;i<nameArray.length- 1; i++ ){
    //             name = name + nameArray[i];
    //         }
    //         var timeStamp = new Date().getTime();
    //         var avatarName = name + timeStamp + "." + type;
    //         var newPath = dir + "/" + avatarName;
    //
    //         fs.rename(files.upload.path, newPath, function (error, result) {
    //             if (error) {
    //                 return console.log("error in rename file ");
    //             }
    //             console.log('ok   success rename file ');
    //             res.json({
    //                 status: 200,
    //                 msg:'收到上传数据',
    //                 data:{
    //                     url: newPath
    //                 }
    //             });
    //         });
    //     });
    // });


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


var mkdir = function (dirpath, callback) {
    var createDir = function (dirPath, callback) {
        fs.exists(dirPath, function (exists) {
            if (exists) {
                callback(dirPath);
            } else {
                createDir(path.dirname(dirPath), function () {
                    fs.mkdir(dirPath, callback);
                });
            }
        });
    };

    fs.exists(dirpath, function (flag) {
        if (flag) {
            return callback(null, dirpath);
        }
        createDir(dirpath, callback);
    });
};
