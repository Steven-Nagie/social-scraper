const q = require('q'),
      Twit = require('twit'),
      config = require('./../config')
      fs = require('fs');

let twitter = new Twit(config.twitter)

// Have to fill in the object below with the proper info, either from the api or from scraping.
exports.getTwitterProfile = url => {
  let defered = q.defer()
  let id = url.substring(url.lastIndexOf('/') + 1);

  let csvContent = '';
  csvParse = (profile) => {
    var totalObjLength = 0;
    for (key in profile) {
      totalObjLength++;

      csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
    };
    fs.appendFileSync('twitter.csv', csvContent, encoding="utf8");
  }

  if(Number(id)){
    twitter.get('statuses/show', {id: id},  (err, data, response) => {
      if (err) return console.log(err)
      var profile = {
        type: 'post',
        screen_name: data.user.screen_name,
        name: data.user.name,
        followers_count: data.user.followers_count,
        statuses_count: data.user.statuses_count,
        favorite_count: data.favorite_count,
        retweets: data.retweet_count
      }
      csvParse(profile);
      console.log(csvContent);
      return defered.resolve(csvContent);
    })
  }
  else{
    twitter.get('users/show', {iuser_id: '', screen_name: id}, (err, data, response) => {
      if (err) return console.log(err)
      var profile = {
        type: 'profile',
        screen_name: data.screen_name,
        name: data.name,
        followers_count: data.followers_count,
        statuses_count: data.statuses_count
      }
      csvParse(profile);
      console.log(csvContent);
      return defered.resolve(csvContent);
    })
  }

  return defered.promise
};
