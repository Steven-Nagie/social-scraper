(function(){
  'use strict'
  angular
    .module('ss')
    .service('dataService', dataService)

    dataService.$inject = ['$http']

    function dataService($http){

      var socket = io.connect('http://localhost:3000/');
      var userId = Math.random().toString(36).substr(2, 5);
      socket.emit('userLogin', userId)

      this.startProcess = function(postsURLs){
        console.log(postsURLs);
        socket.emit('startProcess', {
          postsURLs: postsURLs,
          userId: userId
        });
      };

      this.login = function(){
        $http.get('/authorize_user').then(function(response){
          console.log(response.data)
        })
      };

      socket.on('facebookProfile', function(profile){
        console.log('facebook', profile)
      });

      socket.on('instagramProfile', function(profile){
        console.log('instagram', profile)
      });

      socket.on('twitterProfile', function(profile){
        console.log('twitter', profile)
      });

    };
})();