const q = require('q'),
      Twit = require('twit'),
      config = require('./../config');

var twitter = new Twit(config.twitter)








module.exports = {
  getFacebookProfile: function(data){
    let defered = q.defer()
    // here we do a q.all do get all profile information. 
    setTimeout(function(){
      defered.resolve(`${data} then got profile`);
    }, 500)

    return defered.promise
  },
  getInstagramProfile: function(data){
    let defered = q.defer()
    // here we do a q.all do get all profile information. 
    setTimeout(function(){
      defered.resolve(`${data} then got profile`);
    }, 500)

    return defered.promise
  },
  getTwitterProfile: function(url){
    let defered = q.defer()
    twitter.get('statuses/show', { id: '804000988604399616'}, function (err, data, response) {
      defered.resolve(data);
    })
    return defered.promise
  }
}//end of module.exports
