(function() {
  'use strict';

  angular
    .module('ss')
    .directive('sidebar', sidebar)

    function sidebar(){
      return{
        templateUrl: "./components/sidebar.html"
      }
    }

})();