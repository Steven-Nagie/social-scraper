(function(){
  'use strict'
  angular
    .module('ss')
    .service('dataService', dataService)

    function dataService(){
      this.startProcess = function(list){
        //api call here
        console.log(list)
      }
    }
})();