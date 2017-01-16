const q = require('q');

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