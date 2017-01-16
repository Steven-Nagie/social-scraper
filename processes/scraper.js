
const q = require('q');
var cheerio = require('cheerio');
var fs = require('fs');
var request = require('request');

module.exports = {
  crawlFacebookPost: url => {
    let defered = q.defer()

    setTimeout(function(){
      defered.resolve(`${url} crawled facebook`);
    }, 500)

    return defered.promise
  },
  crawlInstagramPost: url => {
    let defered = q.defer()

    setTimeout(function(){
      defered.resolve(`${url} crawled instagram`);
    }, 500)

    return defered.promise
  },
  crawlTwitterPost: url => {
    let defered = q.defer()
    
    setTimeout(function(){
      defered.resolve(`${url} crawled twitter`);
    }, 500)
    
    return defered.promise
    }
}



// request("https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater", function(error, response, body) {
//   console.log('request in process');
//   if(error) {
//     console.log("Error: " + error);
//   }
//   console.log("Status code: ", response.statusCode);

//   var $ = cheerio.load(body);

//   // This should grab total reactions, but only from the view seen by a user. Have to figure out how it will work without a signed-in user
//   var reactions = $('span._4arz > span').text().trim();
//   // Hopefully will get user's name from a post, even without a signed-in account.
//   var name = $('span.fwn > span.fwb > a:first-child').text();
//   console.log("name: ", name);
// })

/*
module.exports = {
  crawlFacebookPost: url => {
    request(url, function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }

      var $ = cheerio.load(body);

      // This should grab total reactions, but only from the view seen by a user. Have to figure out how it will work without a signed-in user
      var reactions = $('span._4arz > span').text().trim();
      // Hopefully will get user's name from a post, even without a signed-in account.
      var name = $('span.fwb').text().trim();
    })
  },
  crawlInstagramPost: url => {
    request(url, function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }

      var $ = cheerio.load(body);
    })
  },
  crawlTwitterPost: url => {
    request(url, function(error, response, body) {
      if(error) {
        console.log("Error: " + error);
      }

      var $ = cheerio.load(body);
    })
*/


