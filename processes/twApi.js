const q = require('q'),
  Twit = require('twit'),
  config = require('./../config');

let twitter = new Twit(config.twitter)

const buildProfileFromId = function (data, statusCode) {
  return {
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

const buildProfileFromScreenName= function (data, statusCode) {
  return {
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

exports.validateData = function(url){
  if(!url) return false;
  if(typeof(url) !== 'string') return false;
  if(!url.includes('twitter')) return false;
  if(!url.includes('/')) return false;
  if(!url.substring(url.lastIndexOf('/') + 1).trim()) return false;
  return true;
}

exports.parseData = function(url){
  let endpoint = url.substring(url.lastIndexOf('/') + 1).replace(/\s/g,'').replace(/[!@#$%^&*()":;',?<>_=+|-]/ig, '')
  if (Number(endpoint)){
    return {
      type: 'post',
      endpoint: endpoint
    }
  }
  else {
    return {
      type: 'profile',
      endpoint: endpoint
    }
  }
}

exports.getPost = function(endpoint){
  let defered = q.defer()
  twitter.get('statuses/show', {
      id: endpoint
    }, (err, data, response) => {
      if (err) return defered.resolve(buildErrorReport(err, response.statusCode))
      else return defered.resolve(buildProfileFromId(data, response.statusCode));
    })
   return defered.promise;
}


exports.getProfile = function(endpoint){
  let defered = q.defer()
    twitter.get('users/show', {
      iuser_id: '',
      screen_name: endpoint
    }, (err, data, response) => {
      if (err) return defered.resolve(buildErrorReport(error, response.statusCode))
      return defered.resolve(buildProfileFromScreenName(data, response.statusCode));
    })
  return defered.promise
};