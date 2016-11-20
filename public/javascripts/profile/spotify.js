/**
 * Spotify spotifyWebApi Module
 */

/*jshint node: true */
/*jshint browser: true */

'use strict';

var spotifyWebApi = (function () {

  var spotifyWebApi = {};

  // Get hash parameters from url.   
  spotifyWebApi.getHashParams = function (hash) {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g;
    while ( e = r.exec(hash) ) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  // Gets acces_token from localstorage.
  spotifyWebApi.getAccessToken = function () {
    return sessionStorage.getItem('access_token') || '';
  };

  // Set access_token to localstorage.
  spotifyWebApi.setAccessToken = function (access_token) {
    sessionStorage.setItem('access_token', access_token);
  };

  return spotifyWebApi;

})();