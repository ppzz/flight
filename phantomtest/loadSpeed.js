var page = require('webpage').create();
var system = require('system');
var costTime = null;
var url = null;


if (system.args.length !==2) {
    console.log('Usage: loadSpeed.js <some URL>');
    phantom.exit();
}

costTime = new Date();

url = system.args[1];
page.open(url, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the url');
    } else {
        costTime = new Date() - costTime;
        console.log('loading ', url);
        console.log('loading time ', costTime, 'msec');
    }
    phantom.exit();
});
