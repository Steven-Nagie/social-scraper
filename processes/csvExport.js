const fs = require('fs');

exports.createCSV = (data) => {
  // They want instagram followers in there too, which we currently don't have.
  // They ask for Twitter likes, shares, retweets and replies. We give them statuses count (whatever that is), favorites count, and retweets
  fs.unlinkSync('./public/assets/everything.csv');
  fs.appendFileSync('./public/assets/everything.csv', "Twitter Link,Who Tweeted It,Followers (tw),Likes (tw),Retweets,Facebook Link,Followers (fb),Likes (fb),Shares (fb),Comments (fb),Instagram Link,Followers (ig),Likes (ig),Comments (ig),Video Views (ig),Error Link,Error Message\n", encoding="utf8");
  fs.appendFileSync('./public/assets/everything.csv', data.profiles, encoding="utf8");

  }
