const FB = require('fb'),
      q = require('q'),
      fs = require('fs');

if ('./../config') {
  const config = require('./../config');
}

let appId = process.env.APPID || config.facebook.appId;
let appSecret = process.env.APPSECRET || config.facebook.appSecret;
let app = FB.extend({appId: appId, appSecret: appSecret});
let gotToken = false;

exports.getToken = () => {
  let defered = q.defer();
  if(gotToken) defered.resolve("already have token");
  else{
    FB.options({version: 'v2.8'});
    FB.api(`oauth/access_token?client_id=${appId}&client_secret=${appSecret}&grant_type=client_credentials`, function(res) {
      if (!res || res.error) return console.log(!res ? 'error occurred' : res.error);
      app.setAccessToken(res.access_token);
      gotToken = true;
      defered.resolve("made token");
    })
  }
  return defered.promise;
};

exports.validateData = (url) => {
  if (!url) return false;  //Filters out all falsy inputs
  if (typeof(url) !== 'string') return false; //Filters out inputs that aren't strings
  if (!url.includes('facebook')) return false; //Filters out inputs w/out base url
  if (!url.includes('/')) return false; //For inputs without profile name
  if (!url.includes('.com')) return false; //Ensures that all links include .com
  // if(!url.substring(url.lastIndexOf('/') + 1).trim()) return false; //Ensures endpoint is not empty string -> but this line of code breaks so we have to replace it
  return true;
}

exports.parseDataPostsOrVideos = (url) => {
  // For some reason these two functions can't be chained, they need to be separate like this in order to function correctly.
  var remainingUrl = url.replace(/\s/g,''); //Eliminates empty space in thing
  remainingUrl = remainingUrl.substring(remainingUrl.lastIndexOf('.com') + 5); //Eliminates any empty space then gets rid of everything before the username
  let arr;
  if (remainingUrl.includes('videos')) {
    arr = remainingUrl.split('/videos/');
  } else {
    arr = remainingUrl.split('/posts/');
  }
  let obj = {url: url, influencer: arr[0], post_id: arr[1].replace(/\//g, '')};
  return obj;
}

exports.parseDataPhotos = (url) => {
  // For some reason these two functions can't be chained, they need to be separate like this in order to function correctly.
  var remainingUrl = url.replace(/\s/g,''); //Eliminates empty space in thing
  remainingUrl = remainingUrl.substring(remainingUrl.lastIndexOf('.com') + 5); //Eliminates any empty space then gets rid of everything before the username
  // index of and lastindex of /
  let arr = remainingUrl.split('/photos/');
  let obj = {url: url, influencer: arr[0], post_id: arr[1].substring(arr[1].indexOf('/') + 1, arr[1].lastIndexOf('/'))};
  return obj;
}

exports.parseDataUser = (url) => {
  var username = url.replace(/\s/g, '');
  username = username.substring(username.lastIndexOf('.com') + 5);
  if (username.includes('/')) {
    username = username.slice(0, username.indexOf('/'));
  }
  let obj = {url: url, influencer: username};
  return obj;
}

exports.parseDataPermalink = (url) => {
    var remainingUrl = url.replace(/\s/g, '');
    let obj = {url: url, influencer: remainingUrl.substring(remainingUrl.lastIndexOf('id=') + 3), post_id: remainingUrl.substring(remainingUrl.indexOf('id=') + 3, remainingUrl.indexOf('&'))};
    return obj;
}

exports.getUserIdAndFans =(obj) => {
    let defered = q.defer();
    app.api(`${obj.influencer}?fields=id,fan_count`, function(res) {
      if(!res || res.error) {
        defered.resolve(!res ? {url: obj.url, influencer: obj.influencer, platform: "Facebook", followers: 'N/A', type: "error", postingDate: "N/A", likes: "N/A", shares: "N/A", comments: "N/A", views: "N/A", response: 'Invalid input. Remember that private user profiles are not legally accessible.'} : {url: obj.url, followers: 'N/A', influencer: obj.influencer, platform: "Facebook", type: "error", postingDate: "N/A", likes: "N/A", shares: "N/A", comments: "N/A", views: "N/A", response: `${res.error.message}. Remember that private user profiles are not legally accessible.`});
      }
      obj.platform = "Facebook";
      obj.type = "user";
      obj.id = res.id;
      obj.followers = res.fan_count;
      obj.response = "complete";
      obj.postingDate = "N/A";
      obj.likes = "N/A";
      obj.shares = "N/A";
      obj.comments = "N/A";
      obj.views = "N/A";
      defered.resolve(obj);
    });
    return defered.promise;
}

exports.getPostInfo = (obj) => {
  let defered = q.defer();
  app.api(`${obj.id}_${obj.post_id}?fields=created_time,shares.limit(1000000),likes.limit(1000000),comments.limit(1000000)`, function(res)  {
    if(!res || res.error) {
      defered.resolve(!res ? {url: obj.url, followers: 'N/A', influencer: obj.influencer, platform: "Facebook", type: "error", postingDate: "N/A", likes: "N/A", shares: "N/A", comments: "N/A", views: "N/A", response: 'Invalid input. Remember that private user profiles are not legally accessible.'} : {url: obj.url, followers: 'N/A', influencer: obj.influencer, platform: "Facebook", type: "error", postingDate: "N/A", likes: "N/A", shares: "N/A", comments: "N/A", views: "N/A", response: `${res.error.message}. Remember that private user profiles are not legally accessible.`});
    }
    let time = "Unknown";
    if (res.created_time) {
      // If they wanted the international format this could all be shortened into:
      // obj.postingDate = !res.created_time ? "Unknown" : res.created_time..substring(0, res.created_time.indexOf('T')).split('-').reverse().join('/');
      time = res.created_time.substring(0, res.created_time.indexOf('T')).split('-');
      let year = time.shift();
      time.push(year);
      time = time.join('/');
    }
    obj.type = "post"
    obj.postingDate = time;
    obj.likes = !res.likes ? 0 : res.likes.data.length;
    obj.shares = !res.shares ? 0 : res.shares.count;
    obj.comments = !res.comments ? 0 : res.comments.data.length;
    defered.resolve(obj);
  });
  return defered.promise;
}

// Where everything comes together
exports.facebook = (data) => {
  let outerDefer = q.defer();
  let user = {};

  if (data.includes('videos') || data.includes('posts')) {
    user = exports.parseDataPostsOrVideos(data);
  } else if (data.includes('photos')) {
    user = exports.parseDataPhotos(data);
  } else if (data.includes('permalink')) {
    user = exports.parseDataPermalink(data);
  } else {
    user = exports.parseDataUser(data);
  }


  exports.getUserIdAndFans(user)
    .then(response => {
      user = response;
      if (user.post_id) {
        return exports.getPostInfo(user);
      } else { // This work for both those links that don't include a post id and links that cause errors. Errors will not have a post_id property
        return outerDefer.resolve(user);
      }
    })
    .then(response => {
      outerDefer.resolve(response);
    })


  return outerDefer.promise;
}
