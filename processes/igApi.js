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
      console.log(err.status);
    } else {
      config.access_token = result.access_token;
      console.log('Yay! Access token is ' + result.access_token);
      res.redirect('/')
    }
  });
};

const buildProfileFromShortcode = function (data, instagramUrl) {

  return {
    type: 'post',
    influencer: data.user.username,
    followers: '',
    url: instagramUrl,
    postingDate: '1/1/2017',
    platform: 'Instagram',
    likes: data.likes.count,
    shares: '',
    comments: data.comments.count,
    views: ''

  }
}    

const buildErrorReport= function (error, instagramUrl) {
  console.log('from error')
  return {
  
    type: 'post',
    influencer: '',
    followers: '',
    url: instagramUrl,
    postingDate: '1/1/2017',
    platform: 'Instagram',
    likes: '',
    shares: '',
    comments: '',
    views: '',

  }
}


exports.validateData = function(instagramUrl){
  if(!instagramUrl) return false;  //Filters out all falsy inputs
  if(typeof(instagramUrl) !== 'string') return false; //Filters out all inputs that are not a string
  if(!instagramUrl.includes('instagram')) return false; //Filters out all inputs that do not have base Url
  if(!instagramUrl.includes('/')) return false; //Filters out all inputs that do not an endpoint
  return true;
};

exports.parseData = function(instagramUrl){
  return {
    shortcode: instagramUrl.match(/\/p\/(.*)\//gi)[0].replace(/\/p|[\/]/gi,'')
  }

};

exports.getPost = function(shortcode, instagramUrl){
  let defered = q.defer();
  axios.get(`https://api.instagram.com/v1/media/shortcode/${shortcode}?access_token=${config.access_token}`).then(response => {
    defered.resolve(buildProfileFromShortcode(response.data.data, instagramUrl));
  }).catch(error => {
    // if (error) defered.resolve(buildErrorReport(error.response, instagramUrl))
  })

  return defered.promise

};
