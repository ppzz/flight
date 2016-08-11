var page = require('webpage').create();

var url = 'http://jandan.net/ooxx';


page.onConsoleMessage = function (msg) {
    console.log('[page Console]' + msg);
};

page.open(url, function (status) {
    page.evaluate(function () {
        console.log(document.title);
    });
    phantom.exit();
});

