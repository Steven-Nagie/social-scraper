const fs = require('fs');

exports.createCSV = (data) => {
  console.log(data.profiles);
  // They want instagram followers in there too, which we currently don't have.
  // They ask for Twitter likes, shares, retweets and replies. We give them statuses count (whatever that is), favorites count, and retweets
  if (fs.existsSync('./public/assets/everything.csv')) {
    fs.unlinkSync('./public/assets/everything.csv');
  }
  fs.appendFileSync('./public/assets/everything.csv', `Influencer,Followers,URL,Posting Date,Platform,Likes,Shares,Comments,Views\n${data.profiles}`, encoding="utf8");
  // fs.appendFileSync('./public/assets/everything.csv', data.profiles, encoding="utf8");

  }
