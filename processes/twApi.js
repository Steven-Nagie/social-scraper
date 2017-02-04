const q = require('q'),
  Twit = require('twit'),
  config = require('./../config');

let twitter = new Twit(config.twitter)

const buildProfileFromId = function (data, statusCode, givenInput) {
  return {
    givenInput: givenInput,
    status: statusCode,
    type: 'post',
    screen_name: data.user.screen_name,
    name: data.user.name,
    followers_count: data.user.followers_count,
    statuses_count: data.user.statuses_count,
    favorite_count: data.favorite_count,
    retweets: data.retweet_count
  }
}

const buildProfileFromScreenName= function (data, statusCode, givenInput) {
  return {
    givenInput: givenInput,
    status: statusCode,
    type: 'profile',
    screen_name: data.screen_name,
    name: data.name,
    followers_count: data.followers_count,
    statuses_count: data.statuses_count
  }
}

const buildErrorReport= function (error, statusCode) {
  return {
    status: error.statusCode,
    message: error.message
  }
}

exports.validateData = function(twitterUrl){
  if(!twitterUrl) return false;  //Filters out all falsy inputs
  if(typeof(twitterUrl) !== 'string') return false; //Filters out all inputs that are not a string
  if(!twitterUrl.includes('twitter')) return false; //Filters out all inputs that do not have base Url
  if(!twitterUrl.includes('/')) return false; //Filters out all inputs that do not an endpoint
  if(!twitterUrl.substring(twitterUrl.lastIndexOf('/') + 1).trim()) return false; //Filters out all inputs that the endpoint is an empty string. 
  return true;
}

exports.parseData = function(twitterUrl){
  let endpoint = twitterUrl.substring(twitterUrl.lastIndexOf('/') + 1).replace(/\s/g,'').replace(/[!@#$%^&*()":;',?<>_=+|-]/ig, '')
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
      if (err) return defered.resolve(buildErrorReport(error, response.statusCode, twitterUrl))
      return defered.resolve(buildProfileFromScreenName(data, response.statusCode, twitterUrl));
    })
  return defered.promise
};