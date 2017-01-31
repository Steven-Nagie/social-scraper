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
            "name": row[2],
            "userName": row[1],
            "fanCount": row[3],
            "postLikes": row[4],
            "postShares": row[5],
            "postComments": row[6]
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
            "type": row[1],
            "userName": row[2],
            "name": row[3],
            "followersCount": row[4],
            "statusesCount": row[5],
            "favoriteCount": row[6],
            "retweets": row[7]
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
            "type": row[1],
            "userName": row[2],
            "name": row[3],
            "commentsCount": row[4],
            "likesCount": row[5],
            "videoViews": row[6]
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
