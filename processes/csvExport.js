const fs = require('fs');

exports.createCSV = (data) => {
  console.log(data);
  // They want instagram followers in there too, which we currently don't have.
  // They ask for Twitter likes, shares, retweets and replies. We give them statuses count (whatever that is), favorites count, and retweets
  fs.unlinkSync('./public/assets/everything.csv');
  fs.appendFileSync('./public/assets/everything.csv', "Twitter Link,Who Tweeted It,Followers (tw),Likes (tw),Shares (tw),Retweets,Replies,Facebook Link,Followers (fb),Likes (fb),Shares (fb),Comments (fb),Instagram Link,Followers (ig),Likes (ig),Comments (ig),Video Views (ig),Error Link,Error Message\n", encoding="utf8");
  fs.appendFileSync('./public/assets/everything.csv', data.profiles, encoding="utf8");
    // console.log("data: ", data);
    // Just send back the csvcontent and throw a certain number of spaces before every line, after the \n
    // for (var key in data) {
    //   if (key === "facebook") {
    //     data[key] = " , , , , , , ," + data[key];
    //     var last = data[key].lastIndexOf('\n');
    //     var butLast = data[key].substring(0, last).replace(/\n/g, '\n , , , , , , ,');
    //     data[key] = butLast + data[key].substring(last);
    //     fs.appendFileSync('./public/assets/everything.csv', data[key], encoding="utf8");
    //     //certain number of spaces, then data
    //   } else if (key === "instagram") {
    //     data[key] = " , , , , , , , , , , , ," + data[key];
    //     var last = data[key].lastIndexOf('\n');
    //     var butLast = data[key].substring(0, last).replace(/\n/g, '\n , , , , , , , , , , , ,');
    //     data[key] = butLast + data[key].substring(last);
    //     fs.appendFileSync('./public/assets/everything.csv', data[key], encoding="utf8");
    //     //certain number of spaces, then data
    //   } else if (key === "twitter") {
    //     fs.appendFileSync('./public/assets/everything.csv', data[key], encoding="utf8");
    //     //No spaces, just data
    //   }
    // }
  }
