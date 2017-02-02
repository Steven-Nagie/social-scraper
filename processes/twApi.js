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

exports.validateData = function(url){
  if(!url.includes('twitter')) return false; 
  else return true;
}

exports.parseData = function(url){
  let endpoint = url.substring(url.lastIndexOf('/') + 1)
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

exports.getTwitterProfile = function(url){
  let defered = q.defer()
  let endpoint = url.substring(url.lastIndexOf('/') + 1)
  if (Number(endpoint)) { //Get Post
    twitter.get('statuses/show', {
      id: endpoint
    }, (err, data, response) => {
      console.log(response.statusCode)
      return defered.resolve(buildProfileFromId(data, response.statusCode));
    })
  } else { //Get User
    twitter.get('users/show', {
      iuser_id: '',
      screen_name: endpoint
    }, (err, data, response) => {
      console.log(response.statusCode)
      return defered.resolve(buildProfileFromScreenName(data, response.statusCode));
    })
  }

  return defered.promise
};