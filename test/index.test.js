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
        expect(response).to.have.all.keys('followers_count', 'statuses_count', 'favorite_count', 'retweets', 'status', 'type', 'screen_name', 'name')
      })
    })

    it('should take url if missing https', function(){
      return tw.getTwitterProfile('twitter.com/jimkchin/status/806134951926067200').then(response => {
        expect(response).to.have.all.keys('followers_count', 'statuses_count', 'favorite_count', 'retweets', 'status', 'type', 'screen_name', 'name')
      })
    })
  })

  describe('Testing Twitter Profiles', function(){
    it('Should take full url', function(){
      return tw.getTwitterProfile('https://twitter.com/JamieAsnow').then(response => {
        expect(response).to.have.all.keys('followers_count', 'statuses_count','status', 'type', 'screen_name', 'name')
      })
    })

    it('should take url if missing https', function(){
      return tw.getTwitterProfile('twitter.com/JamieAsnow').then(response => {
        expect(response).to.have.all.keys('followers_count', 'statuses_count', 'status', 'type', 'screen_name', 'name')

      })
    })

  });

  describe('Testing Twitter invalid inputs', function(){
    it('Should return error status when the API status is not specified', function(){
      return tw.getTwitterProfile('https://twitter.com/jimkchin/806134951926067200').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')
      })
    })

    it('Should return error status when the post id does not exist', function(){
      return tw.getTwitterProfile('https://twitter.com/jimkchin/status/82606').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')
      })
    })
    it('Should return error status if there are typos in the URL', function(){
      return tw.getTwitterProfile('witter.com/jimkchin/status/806134951926067200').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')
      })
    })
    it('Should return error status if the base URL is incomplete', function(){
      return tw.getTwitterProfile('.com/JamieAsnow').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')
      })
    })
    it('Should return error status if the base url is incomplete', function(){
      return tw.getTwitterProfile('/jimkchin/status/806134951926067200').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')    
      })
    })
    it('Should return error status if the base url is incomplete', function(){
      return tw.getTwitterProfile('/JamieAsnow').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')
      })
    })

  })

})