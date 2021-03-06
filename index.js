'use strict'
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    tw = require('./processes/twApi.js'),
    fbApi = require('./processes/fbApi.js'),
    ig = require('./processes/igApi.js'),
    csv = require('./processes/csvExport.js');


app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(morgan('dev'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// This is authoization to use the Instagram API
app.get('/authorize_user', ig.authorize_user);
app.get('/handleauth', ig.handleauth);
// For creating csv file
// No proper error handling here. Ideas?
app.post('/exportCsv', function(req, res, next) {
  try {
    csv.createCSV(req.body);
    res.sendStatus(200);
  } catch (err) {
    throw err;
  }
});


let usersLoggedIn = {};

io.on('connect', socket => {
  socket.on('userLogin', userId => {
    usersLoggedIn[userId] = socket
    console.log(`Logged in =>`, Object.keys(usersLoggedIn))
})
  socket.on('disconnect', () => {
    for (let userId in usersLoggedIn) {
      if (usersLoggedIn[userId] === socket) delete usersLoggedIn[userId];
      console.log(`Logged in =>`, Object.keys(usersLoggedIn))
    }
  })
  socket.on('startProcess', function(data){

    // async await here untill the initializer functions are ready then contintue exection -> if not await, we can do promise returns .then run the for loop.
    // we have to do it out here so we dont get bombarded with that for-loop. The for loop does not wait for the init function to resolve.

    fbApi.getToken(data)
    .then(response => {

      for(let url of data.postsURLs){
        if (url.includes('facebook.com')){
          fbApi.facebook(url)
          .then(profile => usersLoggedIn[data.userId].emit('profile', profile));
        }
        else if (url.includes('instagram.com')){
          let parsedObj = ig.parseData(url);
            ig.getPost(parsedObj.shortcode, url)
            .then(profile => {
              usersLoggedIn[data.userId].emit('profile', profile)
            })
        }
        else if (url.includes('twitter.com')){
          //if(tw.validateData(url)){
            let parsedObj = tw.parseData(url)
            if(parsedObj.type === "post"){
              tw.getPost(parsedObj.endpoint, parsedObj.givenInput).then(profile => {
                usersLoggedIn[data.userId].emit('profile', profile)
              });
            }
            else if(parsedObj.type === "profile"){
              tw.getProfile(parsedObj.endpoint, parsedObj.givenInput).then(profile => {
                usersLoggedIn[data.userId].emit('profile', profile)
              });
            }
          //}
        } else {
          usersLoggedIn[data.userId].emit('profile', {url: url, influencer: "N/A", platform: "N/A", type: "error", postingDate: "N/A", likes: "N/A", shares: "N/A", comments: "N/A", views: "N/A", response: "Not a valid input. Check to ensure it is a Facebook, Instagram, or Twitter url."});
        }
      }
    })


  })


})//end of sockets

http.listen(3000, function () {
  console.log(`listening on port ${this.address().port}`);
})

// if (fb.validateData(url)) {
//   fbApi.facebook(url)
//   .then(profile => usersLoggedIn[data.userId].emit('profile', profile));
// } else {
//   usersLoggedIn[data.userId].emit('profile', {givenInput: url, error: "Not a valid input. Check to ensure it is a Facebook, Instagram, or Twitter url."});
// }

// if(ig.validateData(url)){
//   let parsedObj = ig.parseData(url);
//   ig.getPost(parsedObj.shortcode, url)
//   .then(profile => {
//     usersLoggedIn[data.userId].emit('profile', profile)
//   })
// } else {
//   usersLoggedIn[data.userId].emit('profile', {givenInput: url, error: "Not a valid input. Check to ensure it is a Facebook, Instagram, or Twitter url."});
// }
