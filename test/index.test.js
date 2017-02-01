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


describe('Twitter Testing', function(){
  it('Twitter API Tests should all pass', function(){
    var profilePromise = tw.getTwitterProfile("https://twitter.com/highsteph/status/804000988604399616");
    
    profilePromise.should.be.an('object');
    should.be.true(profilePromise.hasOwnProperty('then'));
    
   

  it('Twitter API Tests should all pass', function(){
    var profilePromise = tw.getTwitterProfile("https://twitter.com/highsteph/status/804000988604399616").then(response => {
      describe('Response Test', function(){
        it('should be an object', function(){
          response.should.be.an('object');
        });
        it('should have proper data', function(){
          should.exist(response.followers_count);
          should.exist(response.statuses_count);
          should.exist(response.favorite_count);
          should.exist(response.retweets);
        });
      })//end of Response Test

    })
  })
})









// //Endpoint testing
// describe('return luke', function(){
//   it('returns luke', function(done){
//     request.get({ url: `http://swapi.co/api/people/1/`},
//       function(error, response, body){
//         if(error) console.log(error)
//         let bodyObj = JSON.parse(body)
//         expect(bodyObj.name).to.equal('Luke Skywalker');
//         expect(bodyObj.hair_color).to.equal('blond');
//         expect(response.statusCode).to.equal(200);
//         done();
//       })
//   })
// })

// // To test with different links we can use environment variables. In command line, link=https://www.facebook etc mocha test/test.js
// describe('Facebook', function() {

//   var link = process.env.fblink || "https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater"
//   it('should return an object', function() {

//     var facebook = fb.facebook(link);

//     return facebook.then(function(data) {
//       console.log(data);
//       data.should.be.an('object');
//     })
//   })

//   it('should contain defined properties username, fanCount, postLikes, postShares, and postComments', function() {
//     var facebook = fb.facebook(link);

//     return facebook.then(function(data) {
//       should.exist(data.username);
//       should.exist(data.fanCount);
//       should.exist(data.postLikes);
//       should.exist(data.postShares);
//       should.exist(data.postComments);
//     })
//   })
// })

// // describe('Instagram', function() {
// //   var link = process.env.iglink || "link";
// //
// //   it('should return an object', function() {
// //     var instagram = ig.whater(link);
// //
// //     return instagram.then(function(data) {
// //       data.should.be.an('object');
// //     })
// //   })
// // })

// describe('Twitter', function() {
//   var link = process.env.twlink || "https://twitter.com/highsteph/status/804000988604399616";

//   it('should return an object', function() {
//     var twitter= tw.getTwitterProfile(link);

//     return twitter.then(function(data) {
//       console.log(data);
//       data.should.be.an('object');
//     })
//   })
// })



// let data = ["https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater"]
// //Endpoint testing
// describe('TESTING FACEBOOK', function(){
//   it('Should return data', function(done){
//     fbApi.getToken(data).then(response => {
//       console.log(response)
//       response.should.be.an('object');
//       done();
//     })
//    })
// })

// //Endpoint testing
// describe('TESTING TWITTER', function(){
//   it('Should return data', function(done){
//     tw.getTwitterProfile("https://twitter.com/highsteph/status/804000988604399616").then(response => {
//       console.log(response)
//       response.should.be.an('object');
//       done(); 
//     })
      
//   })
// })
