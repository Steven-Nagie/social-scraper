const q = require('q');

module.exports = {
  getFacebookProfile: function(twitterPost){
    let defered = q.defer()
    // here we do a q.all do get all profile information. 
    setTimeout(function(){
      defered.resolve('got facebook profile');
    }, 500)

    return defered.promise
  },
  getInstagramProfile: function(twitterPost){
    let defered = q.defer()
    // here we do a q.all do get all profile information. 
    setTimeout(function(){
      defered.resolve('got instagram profile');
    }, 500)

    return defered.promise
  },
  getTwitterProfile: function(twitterPost){
    let defered = q.defer()
    // here we do a q.all do get all profile information. 
    setTimeout(function(){
      defered.resolve('got twitter profile');
    }, 500)

    return defered.promise
  }
}//end of module.exports
