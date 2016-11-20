/**
 * Global Module
 */

/*jshint node: true */
/*jshint browser: true */

'use strict';

var controller = (function (spotifyConfig) {

  /**
   * Model
   */
  var model = {
    getLoginURL: spotifyConfig.getLoginURL(false)
  };

  /**
   * Controller
   */
  var controller = {
    // Set-up controllers for DOM event-elements.
    init: function () {
      view.init();
      // Add eventListeners to the handlers.
      return view.spotifyLoginButton.addEventListener('click', controller.spotifyLogin, false);
    },
    // Event handler function for spotify login button.
    spotifyLogin: function () {
      var spotifyLoginURL = model.getLoginURL;
      view.redirectToSpotify(spotifyLoginURL);
    },
  };

  /**
   * View
   */
  var view = {
    // Register DOM event-elements.
    init: function () {
      this.spotifyLoginButton = document.querySelector('#spotify-login-button');
      return this;
    },
    redirectToSpotify: function (spotifyURL) {
      window.location.href = spotifyURL;
    }
  };

  return controller;

})(spotifyConfig);

