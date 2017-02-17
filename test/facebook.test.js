var request = require('request'),
    chai = require('chai'),
    should = require('chai').should(),
    expect = require('chai').expect,
    chaiAsPromised = require('chai-as-promised'),
    fb = require('../processes/fbApi'),
    testData = require('./data');

chai.use(chaiAsPromised);

describe("FACEBOOK TESTING", function() {

  describe('fb.validateData', function(){

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

  describe("fb.parseDataPostsOrVideos", function() {

    it("Should return an influencer property", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
      expect(response.influencer).to.exist;
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
      expect(response.influencer).to.exist;
      expect(response.post_id).to.exist;
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should erase any trailing / from link", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382///");
      expect(response.post_id).to.exist;
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should return an influencer property for videos", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939");
      expect(response.influencer).to.exist;
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
      expect(response.influencer).to.exist;
      expect(response.post_id).to.exist;
      expect(parseInt(response.post_id)).to.be.a('number');
    })

    it("Should erase any trailing / from link for videos", function() {
      let response = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939////");
      expect(response.post_id).to.exist;
      expect(response.post_id).to.not.include('/');
    })

  }) // End of Facebook POST and VIDEO parsing

  describe("fb.parseDataPhotos", function() {

    it("Should return an influencer property", function() {
      let response = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
      expect(response.influencer).to.exist;
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

  describe("fb.parseDataUser", function() {

    it("Should return an influencer name (case 1)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/aimeefullersnow/");
      expect(response.influencer).to.exist;
    })

    it("Should return an influencer name with no / and no empty space (case 1)", function() {
      let response = fb.parseDataUser("http s://www.face book.com/ai meefullersnow/");
      expect(response.influencer).to.exist;
      expect(response.influencer).to.not.include('/');
    })

    it("Should return a influencer with no / (case 2)", function() {
      let response = fb.parseDataUser("https://www.fac ebook.com/je b.corliss/");
      expect(response.influencer).to.exist;
      expect(response.influencer).to.not.include('/');
    })

    it("Should return a influencer with no / (case 3)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/cart0onz/");
      expect(response.influencer).to.exist;
      expect(response.influencer).to.not.include('/');
    })

    it("Should return a influencer with no / (case 4)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/brandonmikesell23/");
      expect(response.influencer).to.exist;
      expect(response.influencer).to.not.include('/');
    })

    it("Should return a influencer with no / (case 5)", function() {
      let response = fb.parseDataUser("https://www.facebook.com/thealmightyallah/");
      expect(response.influencer).to.exist;
      expect(response.influencer).to.not.include('/');
    })


  }) // End of Facebook USER parsing

  describe("fb.parseDataPermalink", function() {

    it("Should return a influencer", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.influencer).to.exist;
    })

    it("Should return an id", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.post_id).to.exist;
    })

    it("Should return a influencer with no / and no empty space", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.influencer).to.exist;
      expect(response.influencer).to.not.include('/');
      expect(response.influencer).to.not.include(' ');
    })

    it("Should return an id with no / and no empty space", function() {
      let response = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(response.post_id).to.exist;
      expect(response.post_id).to.not.include('/');
      expect(response.post_id).to.not.include(' ');
    })

  }) // End of Facebook PERMALINK parsing

  describe('fb.getUserIdAndFans && fb.parseDataPostsOrVideos', function() {
    this.timeout(5000);
    before(function(done) {
      fb.getToken().then(function(){done()});
    })

    it('Should return an object with influencer, id, followers and post_id', function(done) {
      let userObject = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('influencer');
      expect(user).to.eventually.have.property('id');
      expect(user).to.eventually.have.property('followers');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

    it('Should return an object with influencer, id, followers and post_id', function(done) {
      let userObject = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('influencer');
      expect(user).to.eventually.have.property('id');
      expect(user).to.eventually.have.property('followers');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

    it('Should return an object with influencer, id, followers and post_id', function(done) {
      let userObject = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939/");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('influencer');
      expect(user).to.eventually.have.property('id');
      expect(user).to.eventually.have.property('followers');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

    it('Should return an object with influencer, id, followers and NO post_id in the case of input link with just a influencer', function(done) {
      let userObject = fb.parseDataUser("https://www.facebook.com/aimeefullersnow/");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('influencer');
      expect(user).to.eventually.have.property('id');
      expect(user).to.eventually.have.property('followers');
      expect(user).to.eventually.not.have.property('post_id').notify(done);
    })

    it('Should return an object with influencer, id, followers and post_id', function(done) {
      let userObject = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
      let user = fb.getUserIdAndFans(userObject);
      expect(user).to.eventually.be.an('object');
      expect(user).to.eventually.have.property('influencer');
      expect(user).to.eventually.have.property('id');
      expect(user).to.eventually.have.property('followers');
      expect(user).to.eventually.have.property('post_id').notify(done);
    })

  }) // End of Facebook GET USER ID

  describe("fb.getPostInfo", function() {
    this.timeout(5000);
    let userFull;
    before(function(done) {
      fb.getToken().then(function(){done()});
    })

    beforeEach(function(done) {
      array = [1,2,3,4];
      var rand = array[Math.floor(Math.random() * array.length)];
      if (rand === 1) {
        let userObject = fb.parseDataPhotos("https://www.facebook.com/MassiveNetwork/photos/a.470062353036949.107449.194775607232293/1337412742968568/?type=3&theater");
        fb.getUserIdAndFans(userObject).then((response) => {userFull = response}).then(done);
      } else if (rand === 2) {
        let userObject = fb.parseDataPermalink("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
        fb.getUserIdAndFans(userObject).then((response) => {userFull = response}).then(done);
      } else if (rand === 3) {
        let userObject = fb.parseDataPostsOrVideos("https://www.facebook.com/cart0onz/posts/1797041023877382");
        fb.getUserIdAndFans(userObject).then((response) => {userFull = response}).then(done);
      } else {
        let userObject = fb.parseDataPostsOrVideos("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939/");
        fb.getUserIdAndFans(userObject).then((response) => {userFull = response}).then(done);
      }
    })

    it("Should return an object with url, influencer, id, post_id, followers, shares, comments, and likes", function(done) {
      let answer = fb.getPostInfo(userFull);
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', "platform", "postingDate", "type").notify(done);

    })

    it("Should return an object with url, influencer, id, post_id, followers, shares, comments, and likes", function(done) {
      let answer = fb.getPostInfo(userFull);
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', "platform", "postingDate", "type").notify(done);
    })

    it("Should return an object with url, influencer, id, post_id, followers, shares, comments, and likes", function(done) {
      let answer = fb.getPostInfo(userFull);
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', "platform", "postingDate", "type").notify(done);
    })

    it("Should return an object with url, influencer, id, post_id, followers, shares, comments, and likes", function(done) {
      let answer = fb.getPostInfo(userFull);
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', "platform", "postingDate", "type").notify(done);
    })

  }) //End of Facebook GET POST INFO

  describe("fb.facebook", function() {
    this.timeout(10000);
    before(function(done) {
      fb.getToken().then(function(){done()});
    })

    it("Should do exactly what we want it to (case 1)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/cart0onz/posts/1797041023877382");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 2)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939/");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 3)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/permalink.php?story_fbid=1370824039607865&id=288340451189568");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 4)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/aimeefullersnow/");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'platform', "type").notify(done);
    })

    it("Should do exactly what we want it to (case 5)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/sl1pg8rLP/videos/1499081423439939/");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 6)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/MassiveNetwork/posts/1316604901716019");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 7)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/sl1pg8rLP/posts/1516922548322493");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 8)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/GoProBombSquad/posts/1521657471183229");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 9)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/216875158351676/photos/a.218037834902075.55227.216875158351676/1289469471092234/?type=3&theater");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 10)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/161903407172302/photos/a.161919140504062.39607.161903407172302/1475901979105765/?type=3&theater");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should do exactly what we want it to (case 11)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/ericwillettofficial/");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'platform', "type").notify(done);
    })


    it("Should do exactly what we want it to (case 12)", function(done) {
      let answer = fb.facebook("https://www.facebook.com/willwessonski/videos/1269951999743269/");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', "id", 'followers', 'post_id', 'shares', 'comments', 'likes', 'platform', "type", "postingDate").notify(done);
    })

    it("Should throw an error when stuff breaks", function(done) {
      let answer = fb.facebook("https://www.facebook.com/tatum.monod/photos/a.927441700603682.1073741829.804486849565835/1456800001001180/?type=3&theater");
      expect(answer).to.eventually.be.an('object');
      expect(answer).to.eventually.have.all.keys('influencer', 'url', 'error', 'platform').notify(done);
    })

  }) // End of FACEBOOK TOTAL


}) // end of FACEBOOK TESTING
