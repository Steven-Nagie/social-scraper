const q = require('q'),
  Twit = require('twit'),
  config = require('./../config');

let twitter = new Twit(config.twitter)

const buildProfileFromId = function (data, statusCode, twitterUrl) {
  return {
    status: statusCode,
    type: 'post',
    name: data.user.name,
    influencer: data.user.screen_name,
    followers: data.user.followers_count,
    url: twitterUrl,
    postingDate: '1/1/2017',
    platform: 'Twitter',
    likes: data.favorite_count,
    shares: data.retweet_count,
    comments: '',
    views: '',
    error: ''
  }
}

const buildProfileFromScreenName= function (data, statusCode, twitterUrl) {

  return {
    status: statusCode,
    type: 'profile',
    status: statusCode,
    influencer: data.screen_name,
    followers: data.followers_count,
    url: twitterUrl,
    postingDate: '',
    platform: 'Twitter',
    likes: '',
    shares: '',
    comments: '',
    views: '',
    error: ''
  }
}

const buildErrorReport= function ( error, statusCode, twitterUrl) {
  return {
    type: 'profile',
    status: statusCode,
    influencer: '',
    followers: '',
    url: twitterUrl,
    postingDate: '1/1/2017',
    platform: 'Twitter',
    likes: '',
    shares: '',
    comments: '',
    views: '',
    error: error.message
  }
}

exports.validateData = function(twitterUrl){
  if(!twitterUrl) return false;  //Filters out all falsy inputs
  if(typeof(twitterUrl) !== 'string') return false; //Filters out all inputs that are not a string
  if(!twitterUrl.includes('twitter')) return false; //Filters out all inputs that do not have base Url
  if(!twitterUrl.includes('/')) return false; //Filters out all inputs that do not an endpoint


  // if(!twitterUrl.substring(twitterUrl.lastIndexOf('/') + 1).trim()) return false; //Filters out all inputs that the endpoint is an empty string.

  return true;
}

exports.parseData = function(twitterUrl){
  let endpoint = twitterUrl.substring(twitterUrl.lastIndexOf('/') + 1).replace(/\s/g,'').replace(/[!@#$%^&*()":;',?<>_=+|-]/ig, '')

  // console.log(endpoint)

  if (Number(endpoint)){ // checks if the endpoint is a string or a number
    return {
      type: 'post',
      endpoint: endpoint,
      givenInput: twitterUrl
    }
  }
  else {
    return {
      type: 'profile',
      endpoint: endpoint,
      givenInput: twitterUrl
    }
  }
}

exports.getPost = function(endpoint, twitterUrl){

  let defered = q.defer()
  twitter.get('statuses/show', {
      id: endpoint
    }, (err, data, response) => {
      if (err) return defered.resolve(buildErrorReport(err, response.statusCode, twitterUrl))
      else return defered.resolve(buildProfileFromId(data, response.statusCode, twitterUrl));
    })
   return defered.promise;
}


exports.getProfile = function(endpoint, twitterUrl){

  let defered = q.defer()
    twitter.get('users/show', {
      iuser_id: '',
      screen_name: endpoint
    }, (err, data, response) => {
      if (err) return defered.resolve(buildErrorReport(err, response.statusCode, twitterUrl))
      return defered.resolve(buildProfileFromScreenName(data, response.statusCode, twitterUrl));
    })
  return defered.promise
};
