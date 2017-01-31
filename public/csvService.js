(function() {
  'use strict'
  angular
    .module('ss')
    .service('csvService', csvService);

    csvService.$inject = ['$http'];

    function csvService($http) {

      this.parseProfiles = function(profile) {
        var csvContent = "";
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        return csvContent;
      };

      this.readCSVFacebook = function(file) {
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

      this.readCSVTwitter = function(file) {
        let rows=file.split('\n');
        let cols = [];
        rows.forEach((row) => {
          cols.push(row.split(','));
        });
        let csv = cols.map((row) => {
          return {
            "type": row[0],
            "userName": row[1],
            "name": row[2],
            "followersCount": row[3],
            "statusesCount": row[4],
            "favoriteCount": row[5],
            "retweets": row[6]
          }
        })
        return csv;
      }

      // `${profile.data.type},${profile.data.user.username},${profile.data.user.full_name},${profile.data.comments.count},${profile.data.likes.count}\n`

      this.readCSVInstagram = function(file) {
        let rows=file.split('\n');
        let cols = [];
        rows.forEach((row) => {
          cols.push(row.split(','));
        });
        let csv = cols.map((row) => {
          return {
            "type": row[0],
            "userName": row[1],
            "name": row[2],
            "commentsCount": row[3],
            "likesCount": row[4],
            "videoViews": row[5]
          }
        })
        return csv;
      }

      this.exportCsv = function(facebook, twitter, instagram) {
        return $http({
          method: 'POST',
          url: '/exportCsv',
          data: {
            facebook: facebook,
            twitter: twitter,
            instagram: instagram
          }
        })
        // var data = {
        //   facebook: facebook,
        //   twitter: twitter,
        //   instagram: instagram
        // }
        // $http.post('/exportCsv', data)
      }

    } //End of csvService
})(); //End of IIFE
