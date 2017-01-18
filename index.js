'use strict'
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    scraper = require('./processes/scraper.js'),
    apiCtrl = require('./processes/apiCtrl.js');


app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(morgan('dev'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// This is where you would initially send users to authorize 
app.get('/authorize_user', apiCtrl.authorize_user);
// This is your redirect URI 
app.get('/handleauth', apiCtrl.handleauth);


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

    for(let url of data.postsURLs){
      if (url.includes('facebook.com')){
        scraper.crawlFacebookPost(url)
        .then(data => {
          return apiCtrl.getFacebookProfile(data);
        })
        .then(profile => {
          usersLoggedIn[data.userId].emit('facebookProfile', profile)
        })
      }
      else if (url.includes('instagram.com')){
        scraper.crawlInstagramPost(url)
        .then(data => {
          return apiCtrl.getInstagramProfile(data)
        })
        .then(profile => {
          usersLoggedIn[data.userId].emit('instagramProfile', profile)
        })
      }
      else if (url.includes('twitter.com')){
        apiCtrl.getTwitterProfile(url)
        .then(profile => {
          usersLoggedIn[data.userId].emit('twitterProfile', profile)
        })
      } 
    }
  })


})//end of sockets

http.listen(3000, function () {
  console.log(`listening on port ${this.address().port}`);
})

module.exports = {
  key: 'value'
};