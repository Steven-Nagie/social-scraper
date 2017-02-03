(function(){
  'use strict'
  angular
    .module('ss')
    .service('dataService', dataService)

    dataService.$inject = ['$http']

    function dataService($http){

      this.login = login;
      this.startProcess = startProcess;
      this.subscribeToFacebook = subscribeToFacebook;
      this.subscribeToInstagram = subscribeToInstagram;
      this.subscribeToTwitter =  subscribeToTwitter;

      let facebook_subscribers = [];
      let instagram_subscribers = [];
      let twitter_subscribers = [];

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                       USER INTERACTION
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


      function startProcess(postsURLs){
        console.log(postsURLs);
        socket.emit('startProcess', {
          postsURLs: postsURLs,
          userId: userId
        });
      };

      function login(){
        $http.get('/authorize_user').then(function(response){
          console.log(response.data)
        })
      };

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                        SUBSCRIPTIONS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


      function subscribeToFacebook(cb) {
        facebook_subscribers.push(cb);
      };

      function subscribeToInstagram(cb) {
        instagram_subscribers.push(cb);
      };

      function subscribeToTwitter(cb) {
        twitter_subscribers.push(cb);
      };

       /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                            SOCKETS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


      const socket = io.connect('http://localhost:3000/');
      const userId = Math.random().toString(36).substr(2, 5);
      socket.emit('userLogin', userId)



      socket.on('facebookProfile', function(profile){
        angular.forEach(facebook_subscribers, function (cb) {
            cb(profile);
        });
      });

      socket.on('instagramProfile', function(profile){
        angular.forEach(instagram_subscribers, function (cb) {
            cb(profile);
        });
      });

      socket.on('twitterProfile', function(profile){
        console.log(profile);
        angular.forEach(twitter_subscribers, function (cb) {
            cb(profile);
        });
      });

    }; //End of dataService
})(); //End of IIFE
