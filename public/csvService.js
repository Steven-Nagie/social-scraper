(function() {
  'use strict'
  angular
    .module('ss')
    .service('csvService', csvService);

    csvService.$inject = ['$http'];

    function csvService($http) {

      this.parseProfile = function(profile) {
        var csvContent = `${profile.influencer},${profile.followers},${profile.url},${profile.postingDate},${profile.platform},${profile.likes},${profile.shares},${profile.comments},${profile.views},${profile.response}\n`;
        return csvContent;
      }

      this.exportCsv = function(profiles) {
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
