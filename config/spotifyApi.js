// /config/spotify.js

/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var SpotifyWebApi = require('spotify-web-api-node');

var config = {
  scopes: ['user-read-private', 'user-read-email', 'user-top-read'],
  redirectUri: 'http://localhost:3000/',
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  state: '12345'
};
   
// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  redirectUri : config.redirectUri
});


// Create the authorization URL
spotifyApi.authorizeURL = spotifyApi.createAuthorizeURL(config.scopes, config.state);

module.exports = spotifyApi;