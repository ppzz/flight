var _ = require("lodash");

var page = require('webpage').create();


var reqTimes = 0;


// 匹配所有的请求
var reg1 = /http:\/\/(\w*\.)*(\w*\/)*(\w\.)*.*\.((js)|(css)|(gif)|(jpg)|(png))\??v?=?\d*$/;

page.onResourceRequested = function (requestData, request) {
    // console.log(requestData.id, requestData.url);
    var url = requestData.url;
    if ((/http:\/\/.+\.(jpg)|(gif)|(png)|(jpeg)/gi).test(url)) {
        // console.log(requestData.id, url);
    }

    reqTimes++;
    // console.log('Request:', reqTimes++, JSON.stringify(request, undefined, 4));
    // console.log(_.keys(request));
    // console.log(request);
    // console.log(_.keys(requestData));
    // console.log('=========================');
    console.log(requestData.url);

    // request.abort();
    // if (reqTimes > 1) {
    //     request.abort();
    // }
};

page.onResourceReceived = function (response) {
    // console.log('received:', JSON.stringify(response, undefined, 4));
};

// var url = 'http://jandan.net/ooxx';
var url = 'http://tool.chinaz.com/regex';
page.open(url, function (status) {
    console.log('status', status);
    phantom.exit();
});
