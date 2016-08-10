var page = require('webpage').create();

var url = 'http://jandan.net/ooxx';
var pageImg = 'pageLoading.png';

page.open(url, function (status) {
    console.log('status: ', status);
    if (status === 'success') {
        page.render(pageImg);
    }
    phantom.exit();
});

