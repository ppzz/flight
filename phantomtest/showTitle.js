var page = require('webpage').create();
var url = 'http://jandan.net/ooxx';
page.open(url, function (status) {

    var title = page.evaluate(function () {
        return document.title;
    });
    console.log('title is : ', title);
    phantom.exit();
});
