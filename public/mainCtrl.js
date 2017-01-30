(function(){
  'use strict'
  angular
    .module('ss')
    .controller('MainCtrl', MainCtrl)

    MainCtrl.$inject = ['$scope', 'dataService', 'csvService']

    function MainCtrl($scope, dataService, csvService){
      let vm = this;
      vm.startProcess = startProcess;
      vm.runTests = runTests;
      vm.login = login;
      vm.fbcsv = [{"This is" : "the output area"}];
      vm.twcsv = [{"This is" : "the output area"}];
      vm.igcsv = [{"This is" : "the output area"}];
      vm.fbProfiles = "";
      vm.twProfiles = "";
      vm.igProfiles = "";
      vm.testInput = 'https://twitter.com/highsteph/status/804000988604399616\nhttps://www.instagram.com/p/BNjEF8DA_-M/?taken-by=aimee_fuller\nhttps://twitter.com/JamieAsnow\nhttps://www.facebook.com/Jamieandersonsnow/photos/a.211038416173.137482.208209591173/10153945604136174/?type=3&theater\nhttps://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin\nhttps://www.instagram.com/p/BNXVDlXBfnj/?taken-by=shawnjohnson\nhttps://twitter.com/ShawnJohnson/status/804370878599430144\nhttps://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin\nhttps://twitter.com/jimkchin/status/806134951926067200\nhttps://www.instagram.com/p/BNUTi3Vghki/?taken-by=jebcorliss\nhttps://www.facebook.com/aimeefullersnow/\nhttps://www.instagram.com/p/BNZ1e5_gqcA/\nhttps://www.facebook.com/jeb.corliss/?fref=ts\nhttps://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater'


      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                        SUBSCRIPTIONS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      dataService.subscribeToFacebook(function (profile) {
        $scope.$apply(function () {
          // console.log(profile);

          vm.fbProfiles += csvService.parseProfiles(profile);
          // console.log(vm.fbProfiles);

          vm.fbcsv = csvService.readCSVFacebook(vm.fbProfiles);
        });
      });

      dataService.subscribeToInstagram(function (profile) {
        $scope.$apply(function () {
          // console.log(profile);
          vm.igProfiles += `${profile.data.type},${profile.data.user.username},${profile.data.user.full_name},${profile.data.comments.count},${profile.data.likes.count}\n`
          vm.igcsv = csvService.readCSVInstagram(vm.igProfiles);
          /*
            - if video, include views
            - comment count
            - likes
            - total followers
          */
        });
      });

      dataService.subscribeToTwitter(function (profile) {
        $scope.$apply(function () {
          console.log(profile);
          vm.twProfiles += csvService.parseProfiles(profile);
          vm.twcsv = csvService.readCSVTwitter(vm.twProfiles);
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


      vm.fbcsv = csvService.readCSVFacebook(vm.fbProfiles);

      vm.twcsv = csvService.readCSVTwitter(vm.twProfiles);

      vm.igcsv = csvService.readCSVInstagram(vm.igProfiles);

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                EXPORT
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      vm.exportCsv = function() {
        csvService.exportCsv(vm.fbProfiles, vm.twProfiles, vm.igProfiles);
      }


    }; //End of MainCtrl
})(); //End of IIFE
