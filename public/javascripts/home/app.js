/**
 * Global Module
 */

 // TODO: Rewrite like normal.

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
      // 'useCapture' became optional only in more recent versions of the major browsers; 
      // for example, it was not optional prior to Firefox 6. 
      // You should provide that parameter for broadest compatibility.
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

