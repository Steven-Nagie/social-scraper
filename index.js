'use strict'
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    twApi = require('./processes/twApi.js'),
    fbApi = require('./processes/fbApi.js'),
    igApi = require('./processes/igApi.js');


app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(morgan('dev'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// This is authoization to use the Instagram API
app.get('/authorize_user', igApi.authorize_user);
app.get('/handleauth', igApi.handleauth);


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
      
      console.log(response)

      for(let url of data.postsURLs){
        if (url.includes('facebook.com')){
          fbApi.facebook("https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater")
          .then(profile => usersLoggedIn[data.userId].emit('facebookProfile', profile));
        }
        else if (url.includes('instagram.com')){
          igApi.getInstagramProfile()
          .then(profile => usersLoggedIn[data.userId].emit('instagramProfile', profile));
        }
        else if (url.includes('twitter.com')){
          twApi.getTwitterProfile(url)
          .then(profile => usersLoggedIn[data.userId].emit('twitterProfile', profile));
        } 
      }
    })


  })


})//end of sockets

http.listen(3000, function () {
  console.log(`listening on port ${this.address().port}`);
})
