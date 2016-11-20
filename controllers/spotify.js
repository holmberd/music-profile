/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var spotifyApi = require('../config/spotifyApi');
var Sort = require('../utils/sort');

var spotify = {

  getTopGenres: function (token) {
    return new Promise(function (success, failure) {
      // Set the credentials before making a request.
      spotifyApi.setAccessToken(token);

      spotifyApi.getMyTopArtists()
        .then(function (data) {
          const artists = data.body.items;
          const TOP_GENRES = 5;
          var arrGenres = [];
          var genres = [];
          var total = 0;

          artists.forEach( elem => { 
            if (elem.genres.length > 0) { arrGenres.push(elem.genres); }
          });

          genres = arrGenres.reduce( (prev, curr) => prev.concat(curr) );
          genres = new Sort().mapSort(genres, { isKeyValue: true });
          // Gather the total number of genres.
          total = genres.length;
          // Get the top genres.
          genres = genres.slice(0, TOP_GENRES);

          return success({ items: genres, total: total });
        })
        .catch(function (err) {
          return failure(err);
        });
    }); 
  }

};

module.exports = spotify;

