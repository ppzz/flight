var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';
page.open('http://jandan.net/ooxx', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
        return phantom.exit();
    }

    page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
        var ua = page.evaluate(function () {
            return $('#comment-3210422').attr('id');
        });
        console.log(ua);
        phantom.exit();
    });
});