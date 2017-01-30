const config = require('./../config'),
      FB = require('fb'),
      q = require('q'),
      fs = require('fs');

let app = FB.extend({appId: config.facebook.appId, appSecret: config.facebook.appSecret});
let gotToken = false;

exports.getToken = () => {
  let defered = q.defer();
  if(gotToken) defered.resolve("already have token");
  else{
    FB.options({version: 'v2.8'});
    FB.api(`oauth/access_token?client_id=${config.facebook.appId}&client_secret=${config.facebook.appSecret}&grant_type=client_credentials`, function(res) {
      if (!res || res.error) return console.log(!res ? 'error occurred' : res.error);
      app.setAccessToken(res.access_token);
      gotToken = true;
      defered.resolve("made token");
    })
  }
  return defered.promise;
};

exports.facebook = (data) => {
  let outerDefer = q.defer();


  var profile = {};
  var user;
  var id;
  var csvContent = "";

  if (data.includes('photos')) {
    parseUserAndId(data);

    getPublicProfile()
    .then(response => {
      console.log("promise return: ", response);
      profile.name = response.name
      profile.fanCount = response.fan_count;
      return getPostLikes();
    })
    .then(postLikes => {
      profile.postLikes = postLikes;
      return getPostShares()
    })
    .then(postShares => {
      profile.postShares = postShares;
      return getPostComments();
    })
    .then(postComments => {
      profile.postComments = postComments;
      // fs.appendFileSync('facebook.csv', csvContent, encoding="utf8");

      outerDefer.resolve(profile);
    })
  } else {
    parseUserAndId(data);

    getPublicProfile()
    .then(response => {
      profile.name = response.name;
      profile.fanCount = response.fan_count;
      // fs.appendFileSync('facebook.csv', csvContent, encoding="utf8");

      outerDefer.resolve(profile);
    })
  }



  function parseUserAndId(site) {

    var startSliceUser = 0;
    var endSliceUser = 0;
    var startSliceId = 0;
    var endSliceId = 0;
    var userFlag = false;
    var idFlag = false;
    var dotCount = 0;
    var slashCount = 0;
    for (let i = 0; i < site.length; i++) {
      if (site.charAt(i) === 'c' && site.charAt(i+1) === 'o' && site.charAt(i+2) === 'm') {
        startSliceUser = i + 4;
      } else if (site.charAt(i) === '/' && startSliceUser !== 0 && startSliceUser < i && !userFlag) {
        endSliceUser = i;
        userFlag = true;
      } else if (site.charAt(i) === '.' && userFlag) {
        dotCount++;
        if (dotCount === 3) {
          startSliceId = i + 1;
        }
      } else if (site.charAt(i) === '/' && i > startSliceId) {
        slashCount++;
        if (slashCount > 1) {
          endSliceId = i;
        }
      }
    }
    user = site.slice(startSliceUser, endSliceUser);
    profile.username = user;
    id = site.slice(startSliceId, endSliceId).replace('/', '_');


  };
  function getPostShares() {
    let defered = q.defer()
    app.api(`${id}?fields=shares`, function(res) {
      if(!res || res.error) return console.log(!res ? 'error occurred' : res.error);

      var shares;
      if (res.shares) {
        shares = res.shares.count;
      } else {
        shares = 0;
      }
      defered.resolve(shares);
    });
    return defered.promise;
  };
  function getPostLikes() {
    let defered = q.defer()
    app.api(`${id}/likes?limit=30000`, function(res) {
      if(!res || res.error) return console.log(!res ? 'error occurred' : res.error);
      defered.resolve(res.data.length);
    });
    return defered.promise;
  };
  // Get post reactions. We can parse them out.
  function getPostReactions() {
    app.api(`${id}/reactions`, function(res) {
      if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
      }
      console.log(res);
    });
  };
  // Get post comments
  function getPostComments() {
    let defered = q.defer()
    app.api(`${id}/comments`, function(res) {
      if(!res || res.error) return console.log(!res ? 'error occurred' : res.error);
      var comments = 0;
      if (res.data) {
        comments = res.data.length;
      }
      defered.resolve(comments);
    });
    return defered.promise;
  };
  // Try to get a person's public page
  // Hitting /likes will show us what they like, not how many likes they have.
  // ?fields=fan_count gets us how many likes they have.
  function getPublicProfile() {
    let defered = q.defer();
    app.api(`${user}?fields=fan_count,name&limit=30000`, function(res) {
      if(!res || res.error) return console.log(!res ? 'error occurred' : res.error);
      defered.resolve(res);
    });
    return defered.promise;
  };


  return outerDefer.promise;
}
