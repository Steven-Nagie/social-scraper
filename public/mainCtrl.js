(function(){
  'use strict'
  angular
    .module('ss')
    .controller('MainCtrl', MainCtrl)

    MainCtrl.$inject = ['$scope', 'dataService', 'csvService']

    function MainCtrl($scope, dataService, csvService){
      let vm = this;
      vm.startProcess = startProcess;
      vm.login = login;
      vm.csv = [{
        twitterLink: "",
        whoTweetedIt: "",
        twitterFollowers: "",
        twitterLikes: "",
        retweets: "",
        facebookLink: "",
        facebookFollowers: "",
        facebookLikes: "",
        facebookShares: "",
        facebookComments: "",
        instagramLink: "",
        instagramFollowers: "",
        instagramLikes: "",
        instagramComments: "",
        instagramVideoViews: "",
        errorLink: "",
        errorMessage: ""
      }];
      vm.gridOptions = {
        data: vm.csv,
        enableColumnResizing: true,
        columnDefs: [
          {name: 'twitterLink', displayName: "Twitter Link", width: "10%"},
          {name: 'whoTweetedIt', displayName: "Username", width: '10%'},
          {name: 'twitterFollowers', displayName: "Followers (tw)", width: '10%'},
          {name: 'twitterLikes', displayName: "Likes (tw)", width: '10%'},
          {name: 'retweets', displayName: "Retweets", width: '10%'},
          {name: 'facebookLink', displayName: "Facebook Link", width: '10%'},
          {name: 'facebookFollowers', displayName: "Followers (fb)", width: '10%'},
          {name: 'facebookLikes', displayName: "Likes (fb)", width: '10%'},
          {name: 'facebookShares', displayName: "Shares (fb)", width: '10%'},
          {name: 'facebookComments', displayName: "Comments (fb)", width: '10%'},
          {name: 'instagramLink', displayName: "Instagram Link", width: '10%'},
          {name: 'instagramFollowers', displayName: "Followers (ig)", width: '10%'},
          {name: 'instagramLikes', displayName: "Likes (ig)", width: '10%'},
          {name: 'instagramComments', displayName: "Comments (ig)", width: '10%'},
          {name: 'instagramVideoViews', displayName: "Instagram Video Views", width: '10%'},
          {name: 'errorLink', displayName: "Error Link", width: '10%'},
          {name: 'errorMessage', displayName: "Error Message", width: '10%'}
        ]
      }
      vm.profilesString = "";
      vm.profilesArray = [];
      vm.countInput = 0;
      vm.countOutput = 0;
      vm.percentLoaded = 0;
      vm.testInput = 'https://twitter.com/highsteph/status/804000988604399616\nhttps://www.instagram.com/p/BNjEF8DA_-M/?taken-by=aimee_fuller\nhttps://twitter.com/JamieAsnow\nhttps://www.facebook.com/Jamieandersonsnow/photos/a.211038416173.137482.208209591173/10153945604136174/?type=3&theater\nhttps://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin\nhttps://www.instagram.com/p/BNXVDlXBfnj/?taken-by=shawnjohnson\nhttps://twitter.com/ShawnJohnson/status/804370878599430144\nhttps://www.instagram.com/p/BNhux3Ngj7O/?taken-by=jimmy_chin\nhttps://twitter.com/jimkchin/status/806134951926067200\nhttps://www.instagram.com/p/BNUTi3Vghki/?taken-by=jebcorliss\nhttps://www.facebook.com/aimeefullersnow/\nhttps://www.instagram.com/p/BNZ1e5_gqcA/\nhttps://www.facebook.com/jeb.corliss/?fref=ts\nhttps://www.facebook.com/brandonmikesell23/photos/a.841942249259190.1073741828.839057202881028/1144637245656354/?type=3&theater'

      vm.input = "";


      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                        SUBSCRIPTIONS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      function sortbyInput(list){
         return function (a, b) {
             var sortingArr = list;
             return sortingArr.indexOf(a.givenInput) - sortingArr.indexOf(b.givenInput);
         }
      }

      dataService.subscribeToData(function (profile) {
        $scope.$apply(function () {
          vm.countOutput += 1;
          vm.loadingBarInner["width"] = ((vm.countOutput/vm.countInput) * 20) + "vw";
          vm.percentLoaded = Math.round((vm.countOutput/vm.countInput) * 100);
          console.log(vm.percentLoaded);

          vm.profilesArray.push(profile);

          if (vm.countOutput === vm.countInput) {
            vm.profilesArray.sort(sortbyInput(vm.input));
            vm.profilesArray.forEach(function(profile) {
              if (profile.error) {
                vm.profilesString += csvService.parseProfileError(profile);
              } else if (profile.givenInput.includes('facebook')) {
                vm.profilesString += csvService.parseProfileFacebook(profile);
              } else if (profile.givenInput.includes('twitter')) {
                vm.profilesString += csvService.parseProfileTwitter(profile);
              } else if (profile.givenInput.includes('instagram')) {
                vm.profilesString += csvService.parseProfileInstagram(profile);
              } else {
                vm.profilesString += csvService.parseProfileError(profile);
              }
            })
            vm.csv = csvService.readCSV(vm.profilesString);
            vm.gridOptions = {
              data: vm.csv,
              enableColumnResizing: true,
            }
            vm.loading["display"] = "none";
          }

        });
      })

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                    LOADING CSS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      vm.loading = {
        "z-index": "100",
        "background-color": "rgb(74,75,85)",
        "position": "absolute",
        "display": "none",
        "flex-direction": "column",
        "justify-content": "space-between",
        "align-items": "center",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)",
        "height": "30vh",
        "width": "30vw",
        "padding": "5vh 0 5vh 0",
      }

      vm.loadingBarOuter = {
        "height": "3vh",
        "width": "20vw",
        "background-color": "white"
      }

      vm.percentLoadedStyle = {
        "position": "absolute",
        "top": "50%",
        "left": "50%",
        "transform": "translate(-50%, -50%)"
      }

      vm.loadingBarInner = {
        "height": "3vh",
        "width": "0vw",
        "float": "left",
        "background-color": "rgb(240,83,79)"
      }

      vm.loadingButton = {
        "cursor": "pointer",
        "color": "white",
        "border": "none",
        "min-width": "15vw",
        "max-width": "15vw",
        "height": "30px",
        "background-color": "rgb(240,83,79)"
      }

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                    USER INTERACTION
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      function startProcess(postsURLs){
        vm.loading["display"] = "flex";
        vm.input = postsURLs.split(/\r?\n/);
        vm.countInput = vm.input.length;
        dataService.startProcess(vm.input)
      };

      function login(){
        dataService.login()
      };

      vm.getResultsNow = function() {
        vm.profilesArray.sort(sortbyInput(vm.input));
        vm.profilesArray.forEach(function(profile) {
          if (profile.error) {
            vm.profilesString += csvService.parseProfileError(profile);
          } else if (profile.givenInput.includes('facebook')) {
            vm.profilesString += csvService.parseProfileFacebook(profile);
          } else if (profile.givenInput.includes('twitter')) {
            vm.profilesString += csvService.parseProfileTwitter(profile);
          } else if (profile.givenInput.includes('instagram')) {
            vm.profilesString += csvService.parseProfileInstagram(profile);
          } else {
            vm.profilesString += csvService.parseProfileError(profile);
          }
        })
        vm.csv = csvService.readCSV(vm.profilesString);
        vm.gridOptions = {
          data: vm.csv,
          enableColumnResizing: true,
        }
        vm.loading["display"] = "none";
      }



      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                          EXPORT
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

      vm.exportCsv = function() {
        csvService.exportCsv(vm.profilesString).then(function(response) {
          if (response.status === 200) {
            window.location =  './assets/everything.csv';
          } else {
            console.log(response.data);
          }
        });
      }


    }; //End of MainCtrl
})(); //End of IIFE
