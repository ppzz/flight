
var Crawler = require('./crawler');
var url = 'http://weibo.com/2196095270/profile/';
var weiboCrawler = new Crawler(url);
var title = '';



fansNumber = weiboCrawler.getWeiBoFans();


