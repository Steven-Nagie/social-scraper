const q = require('q'),
      Twit = require('twit'),
      instagram = require('instagram-node').instagram(),
      config = require('./../config');

var twitter = new Twit(config.twitter)
instagram.use(config.instagram);
var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(instagram.get_authorization_url(redirect_uri, { scope: ['likes'], state: 'a state' }));
};
 
exports.handleauth = function(req, res) {
  instagram.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
    } else {
      console.log('Yay! Access token is ' + result.access_token);
      res.redirect('/')
    }
  });
};

exports.getFacebookProfile = function(data){
  let defered = q.defer()
  // here we do a q.all do get all profile information. 
  setTimeout(function(){
    defered.resolve(`${data} then got profile`);
  }, 500)

  return defered.promise
};

exports.getInstagramProfile = function(data){
  let defered = q.defer()
  // here we do a q.all do get all profile information. 
  setTimeout(function(){
    defered.resolve(`${data} then got profile`);
  }, 200)

  return defered.promise
};

exports.getTwitterProfile = function(url){
  let defered = q.defer()
  twitter.get('statuses/show', { id: '804000988604399616'}, function (err, data, response) {
    defered.resolve(data);
  })
  return defered.promise
};

