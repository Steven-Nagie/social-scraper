(function(){
  'use strict'
  angular
    .module('ss')
    .service('dataService', dataService)

    dataService.$inject = ['$http']

    function dataService($http){

      this.login = login;
      this.startProcess = startProcess;
      this.subscribeToData = subscribeToData;

      let profileData = [];

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                       USER INTERACTION
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


      function startProcess(postsURLs){
        // console.log(postsURLs);
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


      function subscribeToData(cb) {
        profileData.push(cb);
      };

       /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                            SOCKETS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


      const socket = io.connect('http://localhost:3000/');
      const userId = Math.random().toString(36).substr(2, 5);
      socket.emit('userLogin', userId)



      socket.on('profile', function(profile){
        angular.forEach(profileData, function (cb) {
            cb(profile);
        });
      });

      socket.on('instagramProfile', function(profile){
        console.log(profile)
        angular.forEach(instagram_subscribers, function (cb) {
            cb(profile);
        });
      });

      socket.on('twitterProfile', function(profile){
        angular.forEach(twitter_subscribers, function (cb) {
            cb(profile);
        });
      });

    }; //End of dataService
})(); //End of IIFE
