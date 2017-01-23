const q = require('q'),
      instagram = require('instagram-node').instagram(),
      config = require('./../config');
      

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



exports.getInstagramProfile = function(data){
  let defered = q.defer()
    setTimeout(() => {
      defered.resolve("got Instagram")
    }, 500)
  return defered.promise
};


