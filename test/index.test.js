var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    chaiAsPromised = require('chai-as-promised'),
    fb = require('../processes/fbApi.js'),
    ig = require('../processes/igApi.js'),
    tw = require('../processes/twApi.js');

chai.use(chaiAsPromised);


//we still need to handle unauthorized 401 errors --> we have to decide what to do with that.

describe('TWITTER TESTING', function(){

  describe('Data Validation', function(){

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
      expect(tw.validateData('twitter/')).to.be.false
    })

    it('should not validate if parsed string is a space', function(){
      expect(tw.validateData('twitter/ ')).to.be.false
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

  describe('Error Handling', function(){

    it('should handle 404 errors', function(){
      return tw.getPost('80400098860499616').then(response => {
        expect(response).to.have.all.keys('status', 'message')
        expect(response.message).to.eql('No status found with that ID.');
        expect(response.status).to.eql(404);
      })
    })

  })



  describe('Data Parsing', function(){  // My parsing logic assumes that the desired data is located after the last / and is the final part of the string. It also assumes that ID's and usernames will not contain any punctuation.

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

  })// end of twitter Profiles
}) // end of TWITTER TESTING

describe("FACEBOOK TESTING", function() {

  describe('Data Validation', function(){

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(9872094352)).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData([])).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData({})).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(undefined)).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(null)).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(NaN)).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(0)).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(false)).to.be.false
    })

    it('Should not validate if data is not a string', function(){
      expect(fb.validateData(true)).to.be.false
    })

    it('Should not validate if string is empty', function(){
      expect(fb.validateData('')).to.be.false
    })

    it('Should not validate if string is a space', function(){
      expect(fb.validateData(' ')).to.be.false
    })

    it('Should not validate if no input is given', function(){
      expect(fb.validateData()).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('https://jimkchin/806134951926067200')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('https://jimkchin/806134951926067200')).to.be.false
    })

    it('Should not validate if there are typos in the URL', function(){
      expect(fb.validateData('ebook.com/jimkchin/status/806134951926067200')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('.com/JamieAsnow')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('/jimkchin/status/806134951926067200')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('/')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('12345')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('/123456')).to.be.false
    })

    it('Should not validate if missing base URL', function(){
      expect(fb.validateData('/hey ho lets go')).to.be.false
    })

    it('Should not validate if facebook is not followed by a /', function(){
      expect(fb.validateData('facebook')).to.be.false;
    })

    it('Should not validate if parsed string is empty', function(){
      expect(fb.validateData('facebook/')).to.be.false
    })

    it('should not validate if parsed string is a space', function(){
      expect(fb.validateData('facebook/ ')).to.be.false
    })

    it('Should not validate if missing .com', function(){
      expect(fb.validateData('facebook/1234723452')).to.be.false;
    })

    it('should validate if there are spaces with parsed data', function(){
      expect(fb.validateData('facebook.com/ 1235673')).to.be.true
    })

    it('should validate if there are spaces with parsed data', function(){
      expect(fb.validateData('facebook.com / 1232347745')).to.be.true
    })

    it('should validate if there are spaces with parsed data', function(){
      expect(fb.validateData('facebook.com /1232347745')).to.be.true
    })

    it('Should validate valid post URL', function(){
      expect(fb.validateData('https://www.facebook.com/cart0onz/posts/1808047382776746')).to.be.true
    })

    it('Should validate if missing https', function(){
      expect(fb.validateData('facebook.com/cart0onz/posts/1808047382776746')).to.be.true
    })

    it('Should validate valid user URL', function(){
      expect(fb.validateData('https://facebook.com/jeb.corliss')).to.be.true
    })

  }) // end of Data Validation

  describe("Parse url for posts or videos", function() {

    it("Should return a username", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
      expect(response.username).to.exist;
    })

    it("Should return a post_id", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
      expect(response.post_id).to.exist;
    })

    it("Should return a post post_id that is a string of numbers", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should work even with spaces in link", function() {
      let response = fb.parseDataPostsOrVideos("https://w ww.fac ebook.com /cart0onz/po sts/1797041 023877382");
      expect(response.username).to.exist;
      expect(response.post_id).to.exist;
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should erase any trailing / from link", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382///");
      expect(response.post_id).to.exist;
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should return a username for videos", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939");
      expect(response.username).to.exist;
    })

    it("Should return a post post_id for videos", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939");
      expect(response.post_id).to.exist;
    })

    it("Should return a post post_id that is a string of numbers for videos", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939");
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should work even with spaces in link for videos", function() {
      let response = fb.parseDataPostsOrVideos("https ://ww w.facebook.com/s l1pg8rLP/v ideos/149 90814 234399 39");
      expect(response.username).to.exist;
      expect(response.post_id).to.exist;
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should erase any trailing / from link for videos", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939////");
      expect(response.post_id).to.exist;
      expect(response.post_id).to.not.include('/');
    })

  }) // End of Facebook POST and VIDEO parsing

  describe("Parse url for photos", function() {

    it("Should return a username", function() {
      let response = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
      expect(response.username).to.exist;
    })

    it("Should return an post_id", function() {
      let response = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
      expect(response.post_id).to.exist;
    })

    it("Should return an post_id that is a string with only numbers", function() {
      let response = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
      expect(response.post_id).to.exist;
      expect(response.post_id).to.not.include('/');
    })

  }) // End of Facebook PHOTOS parsing

  describe("Parse url for user", function() {

    it("Should return a username (case 1)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/aimeefullersnow/");
      expect(response.username).to.exist;
    })

    it("Should return a username with no / and no empty space (case 1)", function() {
      let response = fb.parseDataUser("http s://www.face book.com/ai meefullersnow/");
      expect(response.username).to.exist;
      expect(response.username).to.not.include('/');
    })

    it("Should return a username with no / (case 2)", function() {
      let response = fb.parseDataUser("https://www.fac ebook.com/je b.corliss/");
      expect(response.username).to.exist;
      expect(response.username).to.not.include('/');
    })

    it("Should return a username with no / (case 3)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/cart0onz/");
      expect(response.username).to.exist;
      expect(response.username).to.not.include('/');
    })

    it("Should return a username with no / (case 4)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/brandonmikesell23/");
      expect(response.username).to.exist;
      expect(response.username).to.not.include('/');
    })

    it("Should return a username with no / (case 5)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/thealmightyallah/");
      expect(response.username).to.exist;
      expect(response.username).to.not.include('/');
    })


  }) // End of Facebook USER parsing

  describe("Parse url for permalink", function() {

    it("Should return a username", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.username).to.exist;
    })

    it("Should return an id", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.post_id).to.exist;
    })

    it("Should return a username with no / and no empty space", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.username).to.exist;
      expect(response.username).to.not.include('/');
      expect(response.username).to.not.include(' ');
    })

    it("Should return an id with no / and no empty space", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.post_id).to.exist;
      expect(response.post_id).to.not.include('/');
      expect(response.post_id).to.not.include(' ');
    })

  }) // End of Facebook PERMALINK parsing

  describe('Get User id', function() {
    this.timeout(5000);
    before(function(done) {
      fb.getToken().then(function(){done()});
    })

    it('Should return an object with username, user_id, fan_count and post_id', function(done) {
      let userObject = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('username');
      expect(user).to.eventually.have.property('user_id');
      expect(user).to.eventually.have.property('fan_count');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

    it('Should return an object with username, user_id, fan_count and post_id', function(done) {
      let userObject = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('username');
      expect(user).to.eventually.have.property('user_id');
      expect(user).to.eventually.have.property('fan_count');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

    it('Should return an object with username, user_id, fan_count and post_id', function(done) {
      let userObject = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939/");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('username');
      expect(user).to.eventually.have.property('user_id');
      expect(user).to.eventually.have.property('fan_count');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

    it('Should return an object with username, user_id, fan_count and NO post_id in the case of input link with just a username', function(done) {
      let userObject = fb.parseDataUser("https://www.facebook.com/aimeefullersnow/");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('username');
      expect(user).to.eventually.have.property('user_id');
      expect(user).to.eventually.have.property('fan_count');
      expect(user).to.eventually.not.have.property('post_id').notify(done);
    })

    it('Should return an object with username, user_id, fan_count and post_id', function(done) {
      let userObject = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('username');
      expect(user).to.eventually.have.property('user_id');
      expect(user).to.eventually.have.property('fan_count');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

  }) // End of Facebook GET USER ID


}) // end of FACEBOOK TESTING
