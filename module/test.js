// libs

var _ = require('lodash');
var webpage = require('webpage');

// modules:
var LogPrinter = require('./logger');
var logger = new LogPrinter(0, true);
// var http = require('http');
// var request = require('request');



var webPage = require('webpage');
var page = webPage.create();

page.onResourceRequested = function(requestData, request) {
    if ((/http:\/\/.+?\.[css|js|jpg|gif]$/gi).test(requestData['url'])) {
        console.log('Skipping', requestData['url']);
        request.abort();
    }
};

page.open('http://jandan.net/ooxx/page-2050', function(status) {
    console.log('Status: ' + status);
    // Do other things here...

    var key = _.keys(page);
    console.log(key);
    console.log(page.title);
    console.log(page.content);

    page.render('rest.jpeg', {format: 'jpeg', quantity: 100});
    phantom.exit();
});





//
// function Crawler(url) {
//     this.url = url;
// }
//
// // Crawler.prototype.getWeiBoFans = function () {
// //     var fansNumber;
// //
// //     http.get(this.url, function httpGet(res) {
// //         var html = '';
// //         for (var key in res){
// //             if(typeof res[key] != 'function' ) {
// //                 console.log('--\n',key,'\n',res[key],'\n--');
// //             }else{
// //                 console.log('--\n',key,'\n','\033[33mfunction\033[0m','\n--');
// //             }
// //         }
// //
// //         res.on('data', function resOnData(data) {
// //             html += data;
// //         });
// //
// //         res.on('end', function () {
// //             console.log(html);
// //         });
// //
// //         res.on('error',function() {
// //
// //         })
// //
// //     }).on('error',function() {
// //         console.log('get data error .');
// //
// //     });
// //     return fansNumber;
// // };
//
// Crawler.prototype.downHtml = function (url) {
//     // request(url, function (err, res, body) {
//     //
//     //     var keys = _.keys(res);
//     //     // console.log(keys);
//     //
//     //
//     //     // console.log('statusCode:', res.statusCode);
//     //     // console.log('headers:', res.headers);
//     //     // console.log('url:', res.url);
//     //     // console.log('statueMessage:', res.statusMessage);
//     //
//     //     console.log(body);
//     //
//     // });
//
//     var page = new webpage();
//
//     page.open(url, function (s) {
//         console.log(s);
//         phantom.exit();
//     });
// };
//
//
//
//
//
// var url = "http://jandan.net/ooxx/page-2056";
//
// var page = 2056;
//
// var cra = new Crawler(url);
//
// cra.downHtml(url);

