
var Crawler = require('./crawler');
var url = 'http://passport.weibo.com/visitor/visitor?entry=miniblog&a=enter&url=http%3A%2F%2Fweibo.com%2Fu%2F2196095270&domain=.weibo.com&ua=php-sso_sdk_client-0.6.14&_rand=1445448998.5807';
var weiboCrawler = new Crawler(url);
var title = '';



fansNumber = weiboCrawler.getWeiBoFans();


