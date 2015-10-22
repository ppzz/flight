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
    for (var key in res){
      if(typeof res[key] != 'function' ) {
        console.log('--\n',key,'\n',res[key],'\n--');
      }else{
        console.log('--\n',key,'\n','\033[33mfunction\033[0m','\n--');

      }

    }
    //console.log('-------------');
    //console.log('--\n',res.headers,'\n--');
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
  return fansNumber;
};

module.exports = Crawler;