var LogPrinter = require('./logger');
var logger = new LogPrinter(0, true);
var http = require('http');

function Crawler(url) {
  this.url = url;
}

Crawler.prototype.test = function () {
  return 'test';
};

Crawler.prototype.getWeiBoFans = function () {
  var fansNumber;

  http.get(this.url, function httpGet(res) {
    var html = '';
    console.log(res);
    res.on('data', function resOnData(data) {
      html += data;
    });

    res.on('end', function () {
      console.log(html);
    });

    res.on('error',function() {

    })

  }).on('error',function() {
    console.log('get data error .');

  });
};

module.exports = Crawler;