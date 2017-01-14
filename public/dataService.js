(function(){
  'use strict'
  angular
    .module('ss')
    .service('dataService', dataService)

    function dataService(){

      var socket = io.connect('http://localhost:3000/');
      var userId = Math.random().toString(36).substr(2, 5);
      socket.emit('userLogin', userId)


      this.startProcess = function(postsURLs){
        console.log(postsURLs)
        socket.emit('startProcess', {
          postsURLs: postsURLs,
          userId: userId
        })
      }

      socket.on('facebookProfile', function(profile){
        console.log(profile)
      })
      socket.on('instagramProfile', function(profile){
        console.log(profile)
      })
      socket.on('twitterProfile', function(profile){
        console.log(profile)
      })

    }
})();