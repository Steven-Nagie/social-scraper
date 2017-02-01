var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    // chaiAsPromised = require('chai-as-promised'),
    fb = require('../processes/fbApi.js'),
    ig = require('../processes/igApi.js'),
    tw = require('../processes/twApi.js');

// chai.use(chaiAsPromised);
 //before() this is where I can maybe do the auth call 


describe('TWITTER TESTING', function(){

describe('Testing Twitter Posts', function(){
  it('Should take full url', function(){
    return tw.getTwitterProfile('https://twitter.com/highsteph/status/804000988604399616').then(response => {
      should.exist(response.followers_count);
      should.exist(response.statuses_count);
      should.exist(response.favorite_count);
      should.exist(response.retweets);
    })
  })

  it('Should take full url', function(){
    return tw.getTwitterProfile('https://twitter.com/jimkchin/status/806134951926067200').then(response => {
      should.exist(response.followers_count);
      should.exist(response.statuses_count);
      should.exist(response.favorite_count);
      should.exist(response.retweets);
    })
  })

  it('should take url if missing https', function(){
    return tw.getTwitterProfile('twitter.com/jimkchin/status/806134951926067200').then(response => {
      should.exist(response.followers_count);
      should.exist(response.statuses_count);
      should.exist(response.favorite_count);
      should.exist(response.retweets);
    })
  })
})

describe('Testing Twitter Profiles', function(){
  it('Should take full url', function(){
    return tw.getTwitterProfile('https://twitter.com/JamieAsnow').then(response => {
      should.exist(response.followers_count);
      should.exist(response.statuses_count);
    })
  })

  it('should take url if missing https', function(){
    return tw.getTwitterProfile('twitter.com/JamieAsnow').then(response => {
      should.exist(response.followers_count);
      should.exist(response.statuses_count);
    })
  })

});




// //Errors
// expect(tw.getTwitterProfile('https://twitter.com/jimkchin/806134951926067200')).to.equal({status: "status: invalid input, please specify status"});
// expect(tw.getTwitterProfile('https://twitter.com/jimkchin/status/82606')).to.equal({status: "status: invalid input, please specify url"});
// expect(tw.getTwitterProfile('witter.com/jimkchin/status/806134951926067200')).to.equal({status: "status: invalid input, please specify url"});
// expect(tw.getTwitterProfile('/jimkchin/status/806134951926067200')).to.equal({status: "status: invalid input, please specify url"});
// expect(tw.getTwitterProfile('.com/JamieAsnow')).to.equal({status: "status: invalid input, please specify url"});
// expect(tw.getTwitterProfile('/JamieAsnow')).to.equal({status: "status: invalid input, please specify url"});

})