/**
 * Spotify spotifyConfig Module
 */

/*jshint node: true */
/*jshint browser: true */

'use strict';

var spotifyConfig = (function () {

  // Set spotifyConfig credentials.
  var spotifyConfig = {
    client_id: 'fd671538a8e848e7bbeb3a583894d466',
    redirect_uri: 'http://localhost:3000/profile',
    scope: 'user-read-email user-top-read'
  };

  // Returns the fully encoded authorize-url for spotify web-spotifyConfig·
  spotifyConfig.getLoginURL = function (diag) {
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(spotifyConfig.client_id);
    url += '&scope=' + encodeURIComponent(spotifyConfig.scope);
    url += '&show_dialog=' + diag; //true/false
    url += '&redirect_uri=' + encodeURIComponent(spotifyConfig.redirect_uri);

    return url;
  };

  return spotifyConfig;

})();