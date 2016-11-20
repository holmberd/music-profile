/*
 * HTTP Module
 * Http request helper library.
 */

var http = (function () {

  var http = {
    getJSON: function (url, token) {
      return this.get(url, token).then(JSON.parse);
    },

    get: function (url, token) {
      return new Promise(function(succeed, fail) {
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.addEventListener("load", function () {
          if (req.status < 400) {
            succeed(req.responseText); 
          } else {
            fail(new Error("Request failed: " + req.statusText));
          }
        });
        req.addEventListener("error", function () {
          fail(new Error("Network error"));
        });
        req.open('GET', url, true);
        req.setRequestHeader('Authorization', 'Bearer ' + token);
        req.send(null);
      });
    }
  };

  return http;

})();