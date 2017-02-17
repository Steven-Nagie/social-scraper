(function() {
  'use strict';

  angular
    .module('ss')
    .directive('output', output)

    function output(){
      return{
        templateUrl: "./components/output.html"
      }
    }

})();