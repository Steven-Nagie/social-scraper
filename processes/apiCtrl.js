const q = require('q');

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
  getTwitterProfile: function(data){
    let defered = q.defer()
    // here we do a q.all do get all profile information. 
    setTimeout(function(){
      defered.resolve(`${data} then got profile`);
    }, 500)

    return defered.promise
  }
}//end of module.exports
