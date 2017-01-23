const q = require('q'),
      Twit = require('twit'),
      config = require('./../config');

var twitter = new Twit(config.twitter)


exports.getTwitterProfile = function(url){
  let defered = q.defer()
  twitter.get('statuses/show', { id: '804000988604399616'}, function (err, data, response) {
    defered.resolve(data);
  })
  
  return defered.promise
};
