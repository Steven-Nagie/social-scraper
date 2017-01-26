(function(){
  'use strict'
  angular
    .module('ss')
    .controller('MainCtrl', MainCtrl)

    MainCtrl.$inject = ['$scope', 'dataService']

    function MainCtrl($scope, dataService){
      let vm = this;
      vm.startProcess = startProcess;
      vm.runTests = runTests;
      vm.login = login;
      vm.csv = [{"This is" : "the output area"}];
      vm.fbProfiles = "";
      vm.testInput = 'https://twitter.com/highsteph/status/804000988604399616\nhttps://www.instagram.com/p/BNjEF8DA_-M/?taken-by=aimee_fuller\nhttps://twitter.com/JamieAsnow\nhttps://www.facebook.com/Jamieandersonsnow/photos/a.211038416173.137482.208209591173/10153945604136174/?type=3&theater\nhttps://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin\nhttps://www.instagram.com/p/BNXVDlXBfnj/?taken-by=shawnjohnson\nhttps://twitter.com/ShawnJohnson/status/804370878599430144\nhttps://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin\nhttps://twitter.com/jimkchin/status/806134951926067200\nhttps://www.instagram.com/p/BNUTi3Vghki/?taken-by=jebcorliss\nhttps://www.facebook.com/aimeefullersnow/\nhttps://www.instagram.com/p/BNZ1e5_gqcA/\nhttps://www.facebook.com/jeb.corliss/?fref=ts\nhttps://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater'


      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                        SUBSCRIPTIONS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      dataService.subscribeToFacebook(function (profile) {
        $scope.$apply(function () {
          console.log(profile);
          vm.fbProfiles += profile;
          vm.csv = readCSV(vm.fbProfiles);
        });
      });

      dataService.subscribeToInstagram(function (profile) {
        $scope.$apply(function () {
          console.log(profile)
        });
      });

      dataService.subscribeToTwitter(function (profile) {
        $scope.$apply(function () {
          console.log(profile)
        });
      });
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                    USER INTERACTION
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      function startProcess(postsURLs){
        dataService.startProcess(postsURLs.split(/\r?\n/))
      };

      function login(){
        dataService.login()
      };

      function runTests(testInput){
        dataService.startProcess(testInput.split(/\r?\n/))
      };

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                CSV DISPLAY IN HTML STUFF
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



      function readCSV(file) {
        let rows=file.split('\n');
        let cols = [];
        rows.forEach((row) => {
          cols.push(row.split(','));
        });
        let csv = cols.map((row) => {
          return {
            "name": row[1],
            "userName": row[0],
            "fanCount": row[2],
            "postLikes": row[3],
            "postShares": row[4],
            "postComments": row[5]
          }
        })
        return csv;
      }
      vm.csv = readCSV(vm.fbProfiles);
      console.log("csv ", vm.csv);


    }; //End of MainCtrl
})(); //End of IIFE
