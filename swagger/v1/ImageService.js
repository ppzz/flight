'use strict';

var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

 function FeedBack(msg, data) {
  this.msg = msg;
  this.data = data;
}

var __uploadFileSize = 10 * 1024 * 1024;
var __fileType = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
var __imageUploadDir = "public/image/dest";


exports.postImage = function(req, args, res, next) {
  console.log(args);

  var now = new Date();

  var fileSize = __uploadFileSize;
  var fileType = __fileType;
  var dir =  __imageUploadDir + now.toLocaleDateString() +'/' + now.getHours();
  var cachePath = "public/image/cache/";

  mkdir(dir, function (error) {
    if (error) {
      console.log(error);
      return res.json(new FeedBack( "保存图片失败"));
    }
    mkdir(cachePath, function (error) {
      if (error) {
        console.log(error);
        return res.json(new FeedBack( "保存图片失败"));
      }

      var form = new formidable.IncomingForm();
      form.encoding = "UTF-8";
      form.uploadDir = cachePath;
      form.keepExtensions = true;
      form.maxFieldsSize = fileSize;
      form.parse(req, function (error, fields, files) {
        if (error) {
          console.log(error);
          return res.json(new FeedBack( "保存图片失败"));
        }
        var fileName = files.upload.name;
        var nameArray = fileName.split(',');
        var type = nameArray[nameArray.length - 1];

        if (fileType.indexOf(files.upload.type) === -1) {
          fs.unlink(files.upload.path);
          return res.json(new FeedBack( "图片格式不正确"));
        }

        var name = '';
        for (var i =0;i<nameArray.length- 1; i++ ){
          name = name + nameArray[i];
        }
        var timeStamp = new Date().getTime();
        var avatarName = name + timeStamp + "." + type;
        var newPath = dir + "/" + avatarName;

        fs.rename(files.upload.path, newPath, function (error) {
          if (error) {
            console.log(error);
            return res.json(new FeedBack( "保存图片失败"));
          }
          var p = newPath.split(__base);
          p = p[p.length - 1];
          var data = {
            url: p
          };
          res.json(new FeedBack("上传成功!", data));
        });
      });
    });
  });


//   /**
//    * parameters expected in the args:
//   * image (file)
//   **/
//     var examples = {};
//   examples['application/json'] = {
//   "name" : "aeiou",
//   "url" : "aeiou"
// };
//   if(Object.keys(examples).length > 0) {
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
//   }
//   else {
//     res.end();
//   }
  
}

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

