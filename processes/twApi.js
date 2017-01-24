const q = require('q'),
      Twit = require('twit'),
      config = require('./../config');

let twitter = new Twit(config.twitter)

// Have to fill in the object below with the proper info, either from the api or from scraping.
exports.getTwitterProfile = function(url){
  let defered = q.defer()
  let id = url.substring(url.lastIndexOf('/') + 1);
  if(Number(id)){
    twitter.get('statuses/show', {id: id}, function (err, data, response) {
      if (err) return console.log(err)
      return defered.resolve({
        username: data.user.screen_name, 
        actualName: data.user.name, 
        fanCount: data.user.followers_count, 
        postLikes: data.favorite_count, 
        retweets: data.retweet_count, 
        postShares: 'Cannot get, I googled it', 
        replies: 'Cannot get, I googled it'
      });
    })
  }
  else{
    console.log('This is a profile', id)
  }
  
  return defered.promise
};
