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

let usersLoggedIn = {};

io.on('connect', socket => {
  socket.on('userLogin', userId => usersLoggedIn[userId] = socket)
  socket.on('disconnect', () => {
    console.log(`Logged in =>`, Object.keys(usersLoggedIn))
    for (let userId in usersLoggedIn) {
      if (usersLoggedIn[userId] === socket) delete usersLoggedIn[userId];
    }
  })
  socket.on('startProcess', function(data){

    for(let url of data.postsURLs){
      if (url.includes('facebook.com')){
        //crawl post and return necessary info for api call
        apiCtrl.getFacebookProfile(url).then(profile => {
          usersLoggedIn[data.userId].emit('facebookProfile', profile)
        })
      }
      else if (url.includes('instagram.com')){
        //crawl post and return necessary info for api call
        apiCtrl.getInstagramProfile(url).then(profile => {
          usersLoggedIn[data.userId].emit('instagramProfile', profile)
        })
      }
      else if (url.includes('twitter.com')){
        //crawl post and return necessary info for api call
        apiCtrl.getTwitterProfile(url).then(profile => {
          usersLoggedIn[data.userId].emit('twitterProfile', profile)
        })
      } 
    }
  })


})

http.listen(3000, function () {
  console.log(`listening on port ${this.address().port}`);
})