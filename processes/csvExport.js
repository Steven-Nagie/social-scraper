const fs = require('fs');

exports.createCSV = (data) => {
  if (fs.existsSync('./public/assets/everything.csv')) {
    fs.unlinkSync('./public/assets/everything.csv');
  }
  fs.appendFileSync('./public/assets/everything.csv', `Influencer,Followers,URL,Posting Date,Platform,Likes,Shares,Comments,Views,Response\n${data.profiles}`, encoding="utf8");

  }
