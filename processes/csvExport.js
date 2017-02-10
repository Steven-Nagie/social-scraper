const fs = require('fs');

exports.createCSV = (data) => {
  // They want instagram followers in there too, which we currently don't have.
  // They ask for Twitter likes, shares, retweets and replies. We give them statuses count (whatever that is), favorites count, and retweets
  fs.unlinkSync('./public/assets/everything.csv');
  fs.appendFileSync('./public/assets/everything.csv', "Influencer,Followers,URL,Posting Date,Platform,Likes,Shares,Comments,Views\n", encoding="utf8");
  fs.appendFileSync('./public/assets/everything.csv', data.profiles, encoding="utf8");

  }
