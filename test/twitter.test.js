 var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    tw = require('../processes/twApi'),
    testData = require('./data');

describe('TWITTER TESTING', function(){

    describe.only('tw.validateData', function(){

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(9872094352)).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData([])).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData({})).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(undefined)).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(null)).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(NaN)).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(0)).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(false)).to.be.false
      })

      it('Should not validate if data is not a string', function(){
        expect(tw.validateData(true)).to.be.false
      })

      it('Should not validate if string is empty', function(){
        expect(tw.validateData('')).to.be.false
      })

      it('Should not validate if string is a space', function(){
        expect(tw.validateData(' ')).to.be.false
      })

      it('Should not validate if no input is given', function(){
        expect(tw.validateData()).to.be.false
      })

      it('Should not validate if missing base URL', function(){
        expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false
      })

      it('Should not validate if missing base URL', function(){
        expect(tw.validateData('https://jimkchin/806134951926067200')).to.be.false
      })

      it('Should not validate if there are typos in the URL', function(){
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

      it('Should not validate if missing base URL', function(){
        expect(tw.validateData('/')).to.be.false
      })

      it('Should not validate if missing base URL', function(){
        expect(tw.validateData('12345')).to.be.false
      })

      it('Should not validate if missing base URL', function(){
        expect(tw.validateData('/123456')).to.be.false
      })

      it('Should not validate if missing base URL', function(){
        expect(tw.validateData('/hey ho lets go')).to.be.false
      })

      it('Should not validate if twitter is not followed by a /', function(){
        expect(tw.validateData('twitter')).to.be.false
      })

      it('Should not validate if parsed string is empty', function(){
        expect(tw.validateData('twitter.com/')).to.be.false
      })

      it('should not validate if parsed string is a space', function(){
        expect(tw.validateData('twitter.com/ ')).to.be.false
      })

      it('Should validate if missing .com', function(){
        expect(tw.validateData('twitter/1234723452')).to.be.true
      })

      it('should validate if there are spaces with parsed data', function(){
        expect(tw.validateData('twitter/ 1235673')).to.be.true
      })

      it('should validate if there are spaces with parsed data', function(){
        expect(tw.validateData('twitter / 1232347745')).to.be.true
      })

      it('should validate if there are spaces with parsed data', function(){
        expect(tw.validateData('twitter /1232347745')).to.be.true
      })

      it('Should validate valid post URL', function(){
        expect(tw.validateData('https://twitter.com/highsteph/status/804000988604399616')).to.be.true
      })

      it('Should validate if missing https', function(){
        expect(tw.validateData('twitter.com/jimkchin/status/806134951926067200')).to.be.true
      })

      it('Should validate valid user URL', function(){
        expect(tw.validateData('https://twitter.com/JamieAsnow')).to.be.true
      })


    }) // end of Data Validation

   



    describe('tw.parseData', function(){  // My parsing logic assumes that the desired data is locaded after the last / and is the final part of the string. It also assumes that ID's and usernames will not contain an punctuation.

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

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status/ 804000988604399616');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status / 804000988604399616 ');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status/8040 00988604399616');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status/8040009886   04399616');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status / 8 0 4 00 0 98 8 60 4 3 996 1 6 ');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com / JamieAsnow  ');
        expect(response.type).to.eql('profile');
        expect(response.endpoint).to.eql('JamieAsnow');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com/Jamie Asnow');
        expect(response.type).to.eql('profile');
        expect(response.endpoint).to.eql('JamieAsnow');
      })

      it('parsed data should not have white space', function() {
        let response = tw.parseData('https://twitter.com / J a m i e A s n o w');
        expect(response.type).to.eql('profile');
        expect(response.endpoint).to.eql('JamieAsnow');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status/80!40009?88604399616');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData('https://twitter.com/highsteph/status/8040009^88604:39961" "6');
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData("'https://twitter.com/highsteph/status/8040009?88604399616'");
        expect(response.type).to.eql('post');
        expect(response.endpoint).to.eql('804000988604399616');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData('https://twitter.com/Jamie%Asnow  "');
        expect(response.type).to.eql('profile');
        expect(response.endpoint).to.eql('JamieAsnow');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData('https://twitter.com/Jamie$Asnow');
        expect(response.type).to.eql('profile');
        expect(response.endpoint).to.eql('JamieAsnow');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData(`"'https://twitter.com/Jamie#Asnow"'`);
        expect(response.type).to.eql('profile');
        expect(response.endpoint).to.eql('JamieAsnow');
      })

      it('parsed data should not contain invalid charicters', function() {
        let response = tw.parseData(`!@#$%^&*()_+-=;:'"<>?|`);
        expect(response.endpoint).to.eql('');
      })


    })// end of Data Parsing

    describe('tw.getPost', function(){
      it('Should take full url', function(){
        return tw.getPost('804000988604399616').then(response => {
          expect(response).to.have.all.keys('followers_count', 'statuses_count', 'favorite_count', 'retweets', 'status', 'type', 'screen_name', 'name', 'givenInput')
        })
      })

      it('should take url if missing https', function(){
        return tw.getPost('806134951926067200').then(response => {
          expect(response).to.have.all.keys('followers_count', 'statuses_count', 'favorite_count', 'retweets', 'status', 'type', 'screen_name', 'name', 'givenInput')
        })
      })
    }) // end of Twitter Posts

    describe('tw.getProfile', function(){
      it('Should take full url', function(){
        return tw.getProfile('JamieAsnow').then(response => {
          expect(response).to.have.all.keys('followers_count', 'statuses_count','status', 'type', 'screen_name', 'name', 'givenInput')
        })
      })
    })// end of twitter Profiles

    describe('tw.getPost Error Handling', function(){

    it('should handle 404 errors', function(){
      return tw.getPost('80400098860499616').then(response => {
        expect(response).to.have.all.keys('givenInput', 'status', 'error')
        expect(response.status).to.eql(404);
      })
    })

    it('should handle 404 errors', function(){
      return tw.getPost('asdf').then(response => {
        expect(response).to.have.all.keys('givenInput', 'status', 'error')
        expect(response.status).to.eql(404);
      })
    })

  })
}) // end of TWITTER TESTING
