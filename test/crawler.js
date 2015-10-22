var expect = require('chai').expect;

var Crawler = require('../module/crawler');
describe('Crawler', function () {
  it('test', function () {
    var testCrawler = new Crawler('123');
    var expc = testCrawler.test();
    expect(expc).to.equal('test');
  });

  it('test weibo fans number', function () {
    var url = 'http://weibo.com/u/2196095270';
    var weiboCrawler = new Crawler();
    var title = '';
    var fansNumber = '';

    var http = require('http');

    fansNumber = weiboCrawler.getWeiBoFans(http);

    expect(fansNumber).to.equal(87);
  });
});