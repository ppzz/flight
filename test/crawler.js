var expect = require('chai').expect;

var Crawler = require('../module/crawler');
describe('Crawler', function () {
  xit('test', function () {
    var testCrawler = new Crawler('123');
    var expc = testCrawler.test();
    expect(expc).to.equal('test');
  });
  
  it('should return a html doc when call getHtml', function () {
    // given:
    var url = 'http://jandan.net/ooxx/page-2056';
    
    // when:
    var crawler = new Crawler();
    var html = crawler.downHtml(url);

    // then:
    // expect(html).to.not.equal(undefined);
  });
});