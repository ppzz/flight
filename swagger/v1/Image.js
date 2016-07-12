'use strict';

var url = require('url');


var Image = require('./ImageService');


module.exports.postImage = function postImage (req, res, next) {
  Image.postImage(req, req.swagger.params, res, next);
};
