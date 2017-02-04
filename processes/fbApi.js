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

exports.validateData = (url) => {
  if (!url) return false;  //Filters out all falsy inputs
  if (typeof(url) !== 'string') return false; //Filters out inputs that aren't strings
  if (!url.includes('facebook')) return false; //Filters out inputs w/out base url
  if (!url.includes('/')) return false; //For inputs without profile name
  if (!url.includes('.com')) return false; //Ensures that all links include .com
  if(!url.substring(url.lastIndexOf('/') + 1).trim()) return false; //Ensures endpoint is not empty string
  return true;
}

exports.parseDataPostsOrVideos = (url) => {
  // For some reason these two functions can't be chained, they need to be separate like this in order to function correctly.
  url = url.replace(/\s/g,''); //Eliminates empty space in thing
  url = url.substring(url.lastIndexOf('.com') + 5); //Eliminates any empty space then gets rid of everything before the username
  let arr;
  if (url.includes('videos')) {
    arr = url.split('/videos/');
  } else {
    arr = url.split('/posts/');
  }
  let obj = {ogLink: url, username: arr[0], post_id: arr[1].replace(/\//g, '')};
  return obj;
}

exports.parseDataPhotos = (url) => {
  // For some reason these two functions can't be chained, they need to be separate like this in order to function correctly.
  url = url.replace(/\s/g,''); //Eliminates empty space in thing
  url = url.substring(url.lastIndexOf('.com') + 5); //Eliminates any empty space then gets rid of everything before the username
  // index of and lastindex of /
  let arr = url.split('/photos/');
  let obj = {ogLink: url, username: arr[0], post_id: arr[1].substring(arr[1].indexOf('/') + 1, arr[1].lastIndexOf('/'))};
  return obj;
}

exports.parseDataUser = (url) => {
  url = url.replace(/\s/g, '');
  url = url.substring(url.lastIndexOf('.com') + 5);
  let obj = {ogLink: url, username: url.replace(/\//g, '')};
  return obj;
}

exports.parseDataPermalink = (url) => {
    url = url.replace(/\s/g, '');
    let obj = {ogLink: url, username: url.substring(url.lastIndexOf('id=') + 3), post_id: url.substring(url.indexOf('id=') + 3, url.indexOf('&'))};
    return obj;
}

exports.getUserIdAndFans =(obj) => {
    let defered = q.defer();
    app.api(`${obj.username}?fields=id,fan_count`, function(res) {
      if(!res || res.error) defered.resolve(!res ? 'error occurred' : res.error);
      obj.id = res.id;
      obj.fan_count = res.fan_count;
      defered.resolve(obj);
    });
    return defered.promise;
}

exports.getPostInfo = (obj) => {
  let defered = q.defer();
  app.api(`${obj.id}_${obj.post_id}?fields=shares.limit(1000000),likes.limit(1000000),comments.limit(1000000)`, function(res)  {
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
