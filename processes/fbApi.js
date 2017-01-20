const config = require('./../config'),
      FB = require('fb');

module.exports = {
  facebook = (data) => {
      var accessToken;
      FB.options({version: 'v2.8'});
      var app = FB.extend({appId: config.appId, appSecret: config.appSecret});


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
              console.log(dotCount);
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
        console.log(id);
        console.log(user);
      }

      parseUser();


      // Default response for appId endpoint contains category, link, name, and id
      getApp = () => {
        app.api(`${config.appId}`, function (res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(res);

        });
      }

      // The 'fields' query paramters determine what the response contains.
      getAppEmail = () => {
        app.api(`${config.appId}?fields=contact_email`, function (res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(res);

        });
      }

      // The id is in the URL, but formatted differently there than they want it here.
      getPost = () => {
        app.api(`${id}`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(res);
          // var totalLikes = res.data.length;
          // console.log("total likes: ", totalLikes);
        });
      }

      // Use id to get more info on user
      // Turns out we get the same information whether we use an id or username, so no real need to keep this.
      /*
      getPublicProfileID = (id) => {
        app.api(`${id}`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(" within id ", res);
        });
      }
      */

      // Try to get a person's public page
      // Hitting /likes will show us what they like, not how many likes they have.
      // ?fields=fan_count gets us how many likes they have.
      getPublicProfile = () => {
        app.api(`${user}`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(res);
          // var totalLikes = res.data.length;
          // console.log("total likes: ", totalLikes);
        });
      }

      // Getting likes for a specific photo from the page. Have to access the page
      getPagePhotoLikes = (photoId) => {
        app.api(`${photoId}/likes?limit=3000`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          console.log(res);
          var totalLikes = res.data.length;
          console.log("total likes: ", totalLikes);
        });
      }

      // Grabbing a page's photos, using an album id that we get from getPage();
      getPagePhotos = (albumId) => {
        app.api(`${albumId}/photos`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          // console.log(res);
          getPagePhotoLikes(res.data[0].id)
        });
      }

      // Grabbing a page based on id, then grabbing their albums
      getPage = () => {
        app.api(`19292868552/albums`, function(res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          // console.log(res);
          getPagePhotos(res.data[1].id)
        });
      }

      // To generate an App access token
      FB.api(`oauth/access_token?client_id=${config.appId}&client_secret=${config.appSecret}&grant_type=client_credentials`, function(res) {

        if (!res || res.error) {
          console.log(!res ? 'error occurred' : res.error);
          return;
        }

        accessToken = res.access_token;
        console.log("access token: ", accessToken);
        app.setAccessToken(accessToken);
        // getPage();
        getPublicProfile();
        getPost();
      })
    }
  }
