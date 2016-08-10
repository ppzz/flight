var page = require('webpage').create();

var url = "http://jandan.net/ooxx";

// page.onResourceRequested = function (requestData, request) {
//     var url = requestData.url;
//     var reg = /http:\/\/(\w*\.)*(\w*\/)*(\w\.)*.*\.((js)|(css)|(gif)|(jpg)|(png))\??v?=?\d*$/;
//     if (reg.test(url)) {
//         return request.abort();
//     }
// };

page.open(url, function (status) {
    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
        var title = page.evaluate(function () {
            // return $("li[id^='comment-']")[0].text();
            return $('title').html;
        });
        console.log('page title is: ' + title);
        phantom.exit();
    });
});
