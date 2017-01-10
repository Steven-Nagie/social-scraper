(function(){
  'use strict'
  angular
    .module('ss')
    .controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['$scope', 'mainSrv']

    function mainCtrl($scope, mainSrv){
      var vm = this;
      vm.broken = mainSrv.broken
    }
})();