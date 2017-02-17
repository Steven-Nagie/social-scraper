(function() {
  'use strict';

  angular
    .module('ss')
    .directive('sidenav', sidenav)

    function sidenav(){
      return{
        templateUrl: "./components/sidenav.html"
      }
    }

})();