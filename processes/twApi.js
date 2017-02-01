const q = require('q'),
  Twit = require('twit'),
  config = require('./../config');

let twitter = new Twit(config.twitter)

export const buildProfileFromId = function (data) {
  return {
    type: 'post',
    screen_name: data.user.screen_name,
    name: data.user.name,
    followers_count: data.user.followers_count,
    statuses_count: data.user.statuses_count,
    favorite_count: data.favorite_count,
    retweets: data.retweet_count
  }
}

exports.getTwitterProfile = url => {
  let defered = q.defer()
  let id = url.substring(url.lastIndexOf('/') + 1);
  if (Number(id)) {
    twitter.get('statuses/show', {
      id: id
    }, (err, data, response) => {
      if (err) return console.log(err)
      return defered.resolve(buildProfileFromId(data));
    })
  } else {
    twitter.get('users/show', {
      iuser_id: '',
      screen_name: id
    }, (err, data, response) => {
      if (err) return console.log(err)
      return defered.resolve({
        type: 'profile',
        screen_name: data.screen_name,
        name: data.name,
        followers_count: data.followers_count,
        statuses_count: data.statuses_count
      });
    })
  }

  return defered.promise
};