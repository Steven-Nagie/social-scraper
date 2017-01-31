const fs = require('fs');

exports.createCSV = (data) => {
  // fs.appendFileSync('./public/assets/everything.csv', "Twitter Link,Who tweeted it,Follower Count,Likes,Shares,Retweets,Replies,Facebook Link,Follower Count,Likes,Shares,Comments,Instagram Link,Total Followers,Likes,Comments,Views\n", encoding="utf8");
    // console.log("data: ", data);
    // Just send back the csvcontent and throw a certain number of spaces before every line, after the \n
    for (var key in data) {
      if (key === "facebook") {
        data[key] = " , , , , , , , ," + data[key];
        var last = data[key].lastIndexOf('\n');
        var butLast = data[key].substring(0, last).replace(/\n/g, '\n , , , , , , , ,');
        data[key] = butLast + data[key].substring(last);
        fs.appendFileSync('./public/assets/everything.csv', data[key], encoding="utf8");
        //certain number of spaces, then data
      } else if (key === "instagram") {
        data[key] = " , , , , , , , , , , , ," + data[key];
        var last = data[key].lastIndexOf('\n');
        var butLast = data[key].substring(0, last).replace(/\n/g, '\n , , , , , , , , , , , ,');
        data[key] = butLast + data[key].substring(last);
        fs.appendFileSync('./public/assets/everything.csv', data[key], encoding="utf8");
        //certain number of spaces, then data
      } else if (key === "twitter") {
        fs.appendFileSync('./public/assets/everything.csv', data[key], encoding="utf8");
        //No spaces, just data
      }
    }
  }
