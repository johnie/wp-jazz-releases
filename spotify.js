var fs         = require('fs');
var request    = require('request');


module.exports = function (artist, cb) {
  request({
    url: 'https://api.spotify.com/v1/search?q='+artist.replace(/ /g, '%20').toLowerCase()+'&type=artist&limit=1',
    json: true
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      if (body.artists.items[0].external_urls !== undefined) {
        cb(body.artists.items[0].external_urls);
      }
    }
  }); 
}
