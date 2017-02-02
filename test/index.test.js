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
  }) // end of Testing Twitter Posts

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

  })// end of Testing Twitter Profiles

  describe('Data Validation', function(){

    it('Should validate valid post URL', () => expect(tw.validateData('https://twitter.com/highsteph/status/804000988604399616')).to.be.true)

    it('Should validate if missing https', () => expect(tw.validateData('twitter.com/jimkchin/status/806134951926067200')).to.be.true)

    it('Should validate valid user URL', () => expect(tw.validateData('https://twitter.com/JamieAsnow')).to.be.true)

    it('Should not validate if missing base URL', () => expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false)

    it('Should not validate if missing base URL', () => expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false)

    it('Should return error status if there are typos in the URL', () => expect(tw.validateData('witter.com/jimkchin/status/806134951926067200')).to.be.false)
    
    it('Should not validate if missing base URL', () => expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false)

    it('Should not validate if missing base URL', () => expect(tw.validateData('.com/JamieAsnow')).to.be.false)

    it('Should not validate if missing base URL', () => expect(tw.validateData('/jimkchin/status/806134951926067200')).to.be.false)

    it('Should return error status when the post id does not exist', function(){
      return tw.getTwitterProfile('https://twitter.com/jimkchin/status/82606').then(response => {
        expect(response.status).to.exist
        // expect(response.status).to.be('invalid input, please specify url')
      })
    })

  }) // end of Testing Twitter invalid inputs

}) // end of TWITTER TESTING