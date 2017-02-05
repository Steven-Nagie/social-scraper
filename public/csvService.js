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
        var csvContent = ` , , , , , , , , , , , , , , ,${profile.givenInput}, ${profile.error}`;
        // var totalObjLength = 0;
        // for (var key in profile) {
        //   totalObjLength++;
        //
        //   csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        // };
        return csvContent;
      };

      this.parseProfileFacebook = function(profile) {
        //{givenInput, fan_count, comments, id, likes, post_id, shares, username}
        if(profile.comments) {
          var csvContent = ` , , , , ,${profile.givenInput},${profile.fan_count},${profile.likes},${profile.shares},${profile.comments}\n`;
        } else {
          var csvContent = ` , , , , ,${profile.givenInput},${profile.fan_count}\n`;
        }
        // var totalObjLength = 0;
        // for (var key in profile) {
        //   totalObjLength++;
        //
        //   csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        // };
        return csvContent;
      };

      this.parseProfileTwitter = function(profile) {
        //{givenInput, name, retweets, screen_name, status, status_count, type, favorite_count, followers_count}
        var csvContent = `${profile.givenInput},${profile.screen_name},${profile.followers_count},${profile.favorite_count},${profile.retweets}\n`;
        // var totalObjLength = 0;
        // for (var key in profile) {
        //   totalObjLength++;
        //
        //   csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        // };
        return csvContent;
      };

      this.parseProfileInstagram = function(profile) {
        var csvContent = ` , , , , , , , , , ,`;
        var totalObjLength = 0;
        for (var key in profile) {
          totalObjLength++;

          csvContent += totalObjLength < Object.keys(profile).length ? profile[key] + ',' : profile[key] + ',' + '\n';
        };
        return csvContent;
      };

      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*
                      PARSE PROFILE STRINGS INTO PROPER OBJECTS FOR CSV
      /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
            retweets: row[4],
            facebookLink: row[5],
            facebookFollowers: row[6],
            facebookLikes: row[7],
            facebookShares: row[8],
            facebookComments: row[9],
            instagramLink: row[10],
            instagramFollowers: row[11],
            instagramLikes: row[12],
            instagramComments: row[13],
            instagramVideoViews: row[14],
            errorLink: row[15],
            errorMessage: row[16]
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
