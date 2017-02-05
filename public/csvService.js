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
        var csvContent = " , , , , , , , , , , , , , , , , ,";
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        return csvContent;
      };

      this.parseProfileFacebook = function(profile) {
        var csvContent = " , , , , , , ,";
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        console.log(csvContent);
        return csvContent;
      };

      this.parseProfileTwitter = function(profile) {
        var csvContent = "";
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        return csvContent;
      };

      this.parseProfileInstagram = function(profile) {
        var csvContent = " , , , , , , , , , , , ,";
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        return csvContent;
      };

      this.parseProfiles = function(profile) {
        var csvContent = "";
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        return csvContent;
      };

      this.readCSV = function(file) {
        let rows=file.split('\n');
        let cols = [];
        rows.forEach((row) => {
          cols.push(row.split(','));
        });
        let csv = cols.map((row) => {
          return {
            twitterLink: row[0],
            whoTweetedIt: row[1],
            twitterFollowers: row[2],
            twitterLikes: row[3],
            twitterShares: row[4],
            retweets: row[5],
            replies: row[6],
            facebookLink: row[7],
            facebookFollowers: row[8],
            facebookLikes: row[9],
            facebookShares: row[10],
            facebookComments: row[11],
            instagramLink: row[12],
            instagramFollowers: row[13],
            instagramLikes: row[14],
            instagramComments: row[15],
            instagramVideoViews: row[16],
            errorLink: row[17],
            errorMessage: row[18]
          }
        })
        console.log(csv);
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
