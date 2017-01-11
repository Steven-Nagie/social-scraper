(function(){
  'use strict'
  angular
    .module('ss')
    .controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['$scope', 'dataService']

    function mainCtrl($scope, dataService){
      var vm = this;
      vm.startProcess = startProcess; 
      vm.runTests = runTests;


      function startProcess(input){
        dataService.startProcess(input.split(/\r?\n/))
      }
    



      vm.testInput = '\n https://twitter.com/highsteph/status/804000988604399616 \n https://www.instagram.com/p/BNjEF8DA_-M/?taken-by=aimee_fuller \n https://twitter.com/JamieAsnow \n https://www.facebook.com/Jamieandersonsnow/photos/a.211038416173.137482.208209591173/10153945604136174/?type=3&theater \n https://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin \n https://www.instagram.com/p/BNXVDlXBfnj/?taken-by=shawnjohnson \n https://twitter.com/ShawnJohnson/status/804370878599430144 \n https://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin \n https://twitter.com/jimkchin/status/806134951926067200 \n https://www.instagram.com/p/BNUTi3Vghki/?taken-by=jebcorliss \n https://www.facebook.com/aimeefullersnow/ \n https://www.instagram.com/p/BNZ1e5_gqcA/ \n https://www.facebook.com/jeb.corliss/?fref=ts \n https://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater'
      function runTests(testInput){
        dataService.startProcess(testInput.split(/\r?\n/))
      }


    }
})();