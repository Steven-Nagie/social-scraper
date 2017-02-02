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
// we still need validation for when postId does not exist - have to hit twitter for that and handle the 404 response 
// we need to handle all responses 400, 401, 404, etc... 

describe('TWITTER TESTING', function(){

  

  describe('Data Validation', function(){

    it('Should validate valid post URL', function(){
      expect(tw.validateData('https://twitter.com/highsteph/status/804000988604399616')).to.be.true
    })

    it('Should validate if missing https', function(){
      expect(tw.validateData('twitter.com/jimkchin/status/806134951926067200')).to.be.true
    })

    it('Should validate valid user URL', function(){
      expect(tw.validateData('https://twitter.com/JamieAsnow')).to.be.true
    })

    it('Should not validate if missing base URL', function(){
      expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false
    })

    it('Should return error status if there are typos in the URL', function(){
      expect(tw.validateData('witter.com/jimkchin/status/806134951926067200')).to.be.false
    })
    
    it('Should not validate if missing base URL', function(){
      expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(tw.validateData('.com/JamieAsnow')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(tw.validateData('/jimkchin/status/806134951926067200')).to.be.false
    })

    

  }) // end of Data Validation 


  describe('Data Parsing', function(){
    it('should return post for post URLs', function() {
      let response = tw.parseData('https://twitter.com/highsteph/status/804000988604399616')
      expect(response.type).to.eql('post');
      expect(response.endpoint).to.eql('804000988604399616');
    })
    it('should return post for post URLs', function() {
      let response = tw.parseData('twitter.com/jimkchin/status/806134951926067200')
      expect(response.type).to.eql('post');
      expect(response.endpoint).to.eql('806134951926067200');
    })
    it('should return profile for profile URLs', function() {
      let response = tw.parseData('https://twitter.com/JamieAsnow');
      expect(response.type).to.eql('profile');
      expect(response.endpoint).to.eql('JamieAsnow'); 
    })
  })// end of Data Parsing


  describe('Twitter Posts', function(){
    it('Should take full url', function(){
      return tw.getPost('804000988604399616').then(response => {
        expect(response).to.have.all.keys('followers_count', 'statuses_count', 'favorite_count', 'retweets', 'status', 'type', 'screen_name', 'name')
      })
    })

    it('should take url if missing https', function(){
      return tw.getPost('806134951926067200').then(response => {
        expect(response).to.have.all.keys('followers_count', 'statuses_count', 'favorite_count', 'retweets', 'status', 'type', 'screen_name', 'name')
      })
    })
  }) // end of Twitter Posts

  describe('Twitter Profiles', function(){
    it('Should take full url', function(){
      return tw.getProfile('JamieAsnow').then(response => {
        expect(response).to.have.all.keys('followers_count', 'statuses_count','status', 'type', 'screen_name', 'name')
      })
    })

  })// end of witter Profiles
}) // end of TWITTER TESTING