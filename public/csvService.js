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
            "Twitter Link": row[0],
            "Who Tweeted It": row[1],
            "Followers (tw)": row[2],
            "Likes (tw)": row[3],
            "Shares (tw)": row[4],
            "Retweets": row[5],
            "Replies": row[6],
            "Facebook Link": row[7],
            "Followers (fb)": row[8],
            "Likes (fb)": row[9],
            "Shares (fb)": row[10],
            "Comments (fb)": row[11],
            "Instagram Link": row[12],
            "Followers (ig)": row[13],
            "Likes (ig)": row[14],
            "Comments (ig)": row[15],
            "Video Views (ig)": row[16],
            "Error Link": row[17],
            "Error Message": row[18]
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
        // var data = {
        //   facebook: facebook,
        //   twitter: twitter,
        //   instagram: instagram
        // }
        // $http.post('/exportCsv', data)
      }

    } //End of csvService
})(); //End of IIFE
