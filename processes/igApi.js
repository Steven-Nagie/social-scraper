const q = require('q'),
      axios = require('axios'),
      instagram = require('instagram-node').instagram(),
      config = require('./../config');

instagram.use({ access_token: config.access_token });
instagram.use(config.instagram);
var redirect_uri = 'http://localhost:3000/handleauth';

exports.authorize_user = function(req, res) {
  res.redirect(instagram.get_authorization_url(redirect_uri, { scope: ['public_content'], state: 'a state' }));
};

exports.handleauth = function(req, res) {
  instagram.authorize_user(req.query.code, redirect_uri, function(err, result) {
    if (err) {
      console.log(err.body);
    } else {
      config.access_token = result.access_token;
      console.log('Yay! Access token is ' + result.access_token);
      res.redirect('/')
    }
  });
};

exports.validateData = function(instagramUrl){
  if(!instagramUrl) return false;  //Filters out all falsy inputs
  if(typeof(instagramUrl) !== 'string') return false; //Filters out all inputs that are not a string
  if(!instagramUrl.includes('instagram')) return false; //Filters out all inputs that do not have base Url
  if(!instagramUrl.includes('/')) return false; //Filters out all inputs that do not an endpoint
  if(!instagramUrl.substring(instagramUrl.lastIndexOf('/') + 1).trim()) return false; //Filters out all inputs that the endpoint is an empty string. 
  return true;
};

exports.parseData = function(instagramUrl){

};

exports.getInstagramProfile = function(instagramUrl){
  let defered = q.defer();
  axios.get(`https://api.instagram.com/v1/media/shortcode/BMIghBeBqMK?access_token=4512030680.ccce173.c3731c8c139d4204a56b464739b5457c`).then(response => {
    var returnData = {data: response.data.data, ogLink: data};
    defered.resolve(returnData);
  }).catch(error => console.log(error));
    // instagram.media('BMIghBeBqMK', function(err, media, remaining, limit) {
    //   if(err) return console.log(err);
    //   defered.resolve(media)
    // });
  return defered.promise
};
