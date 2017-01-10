(function(){
  'use strict'
  angular
    .module('ss')
    .service('mainSrv', mainSrv)

    function mainSrv(){
      this.broken = 'working'
    }
})();