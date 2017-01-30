const fs = require('fs');

exports.createCSV = (data) => {
    // console.log("data: ", data);
    // Just send back the csvcontent and throw a certain number of spaces before every line, after the \n
    for (var key in data) {
      if (key === "facebook") {
        console.log("facebook is present");
        data[key] = " , , , , , , , ," + data[key];
        data[key] = data[key].replace('\n', '\n , , , , , , , ,');
        fs.appendFileSync('everything.csv', data[key], encoding="utf8");
        //certain number of spaces, then data
      } else if (key === "instagram") {
        console.log("instagram is present");
        //certain number of spaces, then data
      } else if (key === "twitter") {
        fs.appendFileSync('everything.csv', data[key], encoding="utf8");
        //No spaces, just data
      }
    }
  }
