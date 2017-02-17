(function() {
  'use strict'
  angular
    .module('ss')
    .service('csvService', csvService);

    csvService.$inject = ['$http'];

    function csvService($http) {

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                                    PARSE PROFILE OBJECTS INTO STRINGS
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
      this.parseProfileError = function(profile) {
        if (profile.error) {
          var csvContent = ` , , , , , , , , , , , , , , ,${profile.givenInput}, ${profile.error}\n`;
        } else {
          var csvContent = ` , , , , , , , , , , , , , , ,${profile.givenInput},There is an error with this input\n`;
        }
        return csvContent;
      };

      this.parseProfileFacebook = function(profile) {
        //{givenInput, fan_count, comments, id, likes, post_id, shares, username}
        if(profile.comments) {
          var csvContent = `${profile.influencer},${profile.followers},${profile.url},${profile.postingDate},${profile.platform},${profile.likes},${profile.shares},${profile.comments}\n`;
        } else {
          var csvContent = `${profile.influencer},${profile.followers},${profile.url}, ,${profile.postingDate},${profile.platform}\n`
        }
        return csvContent;
      };

      this.parseProfileTwitter = function(profile) {
        //{givenInput, name, retweets, screen_name, status, status_count, type, favorite_count, followers_count}
        var csvContent = `${profile.influencer},${profile.followers},${profile.url},${profile.postingDate},${profile.platform},${profile.likes},${profile.shares}\n`;
        return csvContent;
      };

      this.parseProfileInstagram = function(profile) {
          var csvContent = `${profile.influencer},${profile.followers},${profile.url},${profile.postingDate},${profile.platform},${profile.likes},${profile.shares},${profile.comments},${profile.views}\n`;
        return csvContent;
      };

      this.parseProfile = function(profile) {

      }


      this.exportCsv = function(profiles) {
        console.log("Export profiles: ", profiles);
        return $http({
          method: 'POST',
          url: '/exportCsv',
          data: {
            profiles: profiles
          }
        })
      }

    } //End of csvService
})(); //End of IIFE
