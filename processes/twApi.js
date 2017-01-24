const q = require('q'),
      Twit = require('twit'),
      config = require('./../config');

var twitter = new Twit(config.twitter)

// Have to fill in the object below with the proper info, either from the api or from scraping.
exports.getTwitterProfile = function(url){
  let defered = q.defer()
  twitter.get('statuses/show', { id: '804000988604399616'}, function (err, data, response) {
    var info = {username: data.user.screen_name, actualName: data.user.name, fanCount: data.user.followers_count, postLikes: , postShares: , retweets: data.retweet_count, replies: ,}
    defered.resolve(info);
  })

  return defered.promise
};
