/**
 * Global Module
 */

/*jshint node: true */
/*jshint browser: true */

'use strict';

var controller = (function (spotifyWebApi, http, d3, RadarChart) {

  /**
   * Model
   */
  var model = {
    ACCESS_TOKEN_ID: 'access_token',
    HOST_URI: window.location.origin,
    PROFILE_URI: '/profile',
    API_URL: 'profiles',

    getProfileData: function () {
      var bearer = spotifyWebApi.getAccessToken();
      return http.getJSON(this.API_URL, bearer);
    },
  };

  /**
   * Controller
   */
  var controller = {

    init: function () {
      view.init();
      return controller.getAccessTokenFromURI(controller.hasAccessTokenCallback);
    },

    // Event handler function for access_token URI hash check.
    // If token is in URL hash then return token with callback.
    getAccessTokenFromURI: function (callback) {
      var URI_HASH = (/[^#]*$/).exec(window.location.hash)[0];
      var accessToken = '';

      if (URI_HASH.substring(0, model.ACCESS_TOKEN_ID.length) === model.ACCESS_TOKEN_ID) {
        accessToken = spotifyWebApi.getHashParams(URI_HASH).access_token;
        return callback(accessToken);
      } else {
        view.redirectBack();
      }
    },

    hasAccessTokenCallback: function (accessToken) {
      if (accessToken) {    
        spotifyWebApi.setAccessToken(accessToken); // set accessToken to client storage.
        model.getProfileData()
          .then(function success (data) {
            view.hideLoader();
            controller.buildRadarChart(data);
          }, function failure (err) {
            console.error('there was an error fetching data from API', err);
          });
      }
    },

    // Configures and builds dataChart with data.
    buildRadarChart: function (data) {
      var profileData = [data];
      // Configure chart placement.
      var margin = {top: 100, right: 100, bottom: 100, left: 100},
        width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
        height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
          
      /* test data
      data = [
            [
            { axis:"Extraverted", value:0.5 },
            { axis:"Intuitive", value:1 },
            { axis:"Thinking", value:0.5 },
            { axis:"Judging", value:0 },
            { axis:"Assertive", value:0.5 },
            { axis:"Introverted", value:0.5 },
            { axis:"Observant", value:0 },
            { axis:"Feeling", value:0.5 },
            { axis:"Prospecting", value:1 },
            { axis:"Turbulent", value:0.5 }      
            ]
          ];
      */

      // Configure chart styles and options.
      var color = d3.scale.ordinal()
        .range(["#FFCB45"]);
        
      var radarChartOptions = {
        w: width,
        h: height,
        margin: margin,
        maxValue: 1,
        levels: 3,
        roundStrokes: true,
        color: color
      };
      // Call function to draw the Radar chart
      RadarChart('.radarChart', profileData, radarChartOptions);
    }
  };

  /**
   * View
   */
  var view = {

    init: function () {
      this.loader = document.querySelector('.loader');
      return this;
    },

    redirectToSpotify: function (spotifyURL) {
      window.location.href = spotifyURL;
    },
    redirectBack: function () {
      window.location.href = model.HOST_URI;
    },
    hideLoader: function () {
      this.loader.style.display = 'none';
    }

  };

  return controller;

})(spotifyWebApi, http, d3, RadarChart);

