/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var genres = require('./genres');

function buildProfile(topGenre, next) {
  var items = [];
  var genre = null;
  var attribute = null;

  try {
    topGenre = topGenre.toLowerCase();
    for (genre in genres) {
      if (topGenre === genre) {
        for (attribute in genres[genre]) {
          items.push({axis: attribute, value: genres[genre][attribute]});
        }
        return items;
      } 
    }
    for (attribute in genres.world) {
      items.push({axis: attribute, value: genres.world[attribute]});
    }
    return items;

  } catch (err) {
    return next(err);
  }
}

module.exports = buildProfile;