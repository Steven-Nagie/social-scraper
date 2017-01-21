// A lot of the stuff in here isn't necessary, it's left over from when I was playing with the API to get a feel for it.

const config = require('./../config'),
      FB = require('fb');

// module.exports = {
  facebook = (data) => {
      var accessToken;
      FB.options({version: 'v2.8'});
      var app = FB.extend({appId: config.facebook.appId, appSecret: config.facebook.appSecret});


      // If there is any way to see the post's content, it would probably be easier to get its id from the user's feed than to parse the url looking for the correct id.
      // var site = "https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater"

      // var site = "https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1190506704402741/?type=3&theater";

      var site = data;

      var user;
      var id;
      parseUser = () => {
        var startSliceUser = 0;
        var endSliceUser = 0;
        var startSliceId = 0;
        var endSliceId = 0;
        var userFlag = false;
        var idFlag = false;
        var dotCount = 0;
        var slashCount = 0;
        for (let i = 0; i < site.length; i++) {
          if (site.charAt(i) === 'c' && site.charAt(i+1) === 'o' && site.charAt(i+2) === 'm') {
            startSliceUser = i + 4;
          } else if (site.charAt(i) === '/' && startSliceUser !== 0 && startSliceUser < i && !userFlag) {
            endSliceUser = i;
            userFlag = true;
          } else if (site.charAt(i) === '.' && userFlag) {
            dotCount++;
            if (dotCount === 3) {
              startSliceId = i + 1;
            }
          } else if (site.charAt(i) === '/' && i > startSliceId) {
            slashCount++;
            if (slashCount > 1) {
              endSliceId = i;
            }
          }
        }
        user = site.slice(startSliceUser, endSliceUser);
        id = site.slice(startSliceId, endSliceId).replace('/', '_');
      }

      parseUser();

      // Get post shares. Not quite sure what exactly the format will be like.
      getPostShares = () => {
        app.api(`${id}?fields=shares`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          var shares;
          if (res.shares) {
            shares = res.shares.count;
          } else {
            shares = 0;
          }
          console.log("shares: ", shares);
        });
      }

      // Get post likes. Current limit set to 3000, which is an arbitrary number I chose.
      getPostLikes = () => {
        app.api(`${id}/likes?limit=30000`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          var likes = res.data.length;
          console.log("Likes: ", likes);
        });
      }

      // Get post reactions. We can parse them out.
      getPostReactions = () => {
        app.api(`${id}/reactions`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(res);
        });
      }

      // Get post comments
      getPostComments = () => {
        app.api(`${id}/comments`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          var comments = 0;
          if (res.data) {
            comments = res.data.length;
          }
          console.log("comments: ", comments);
        });
      }


      // Try to get a person's public page
      // Hitting /likes will show us what they like, not how many likes they have.
      // ?fields=fan_count gets us how many likes they have.
      getPublicProfile = () => {
        app.api(`${user}?fields=fan_count&limit=30000`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log("profile fan count: ", res.fan_count);
        });
      }


      // To generate an App access token
      FB.api(`oauth/access_token?client_id=${config.facebook.appId}&client_secret=${config.facebook.appSecret}&grant_type=client_credentials`, function(res) {

        if (!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }

        app.setAccessToken(res.access_token);
        getPublicProfile();
        getPostLikes();
        getPostShares();
        getPostComments();
      })
    }
  // }
  facebook("https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater");
