/*jshint node: true */
/*jshint esversion: 6 */

'use strict';

var express = require('express');
var router = express.Router();
var spotify = require('../controllers/spotify');
var buildProfile = require('../utils/build-profile');
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile('/index.html', {root: 'www'});
});

router.get('/profile', function (req, res, next) {
  res.sendFile('/profile.html', {root: 'www'});
});

// GET top artists from users spotify account.
router.get('/profiles', function (req, res, next) {
  var token = '';
  const bits = req.headers.authorization.split(' ');

  // Extract the authorization header credentials.
  if (bits.length === 2) {
        var scheme = bits[0];
        var credentials = bits[1];
        if (/^Bearer$/i.test(scheme)) {
            token = credentials; // NOTE: Needs validation.
        } 
    } 
    else{
        return res.sendStatus(401);
    }

  spotify.getTopGenres(token)
    .then(function (genres) {
      var topGenre = genres.items[0][0];
      var profile = buildProfile(topGenre, next);
      res.status(200).json(profile);
    })
    .catch(function (err) {
      res.status(err.statusCode || 500);
      return res.json({ 'error': { 'statusCode': err.statusCode || 500, 'message': err.message } });
    });
});



module.exports = router;
