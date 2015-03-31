var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var jazzgreats = [];
var url = 'https://codex.wordpress.org/WordPress_Versions';

request(url, function(error, response, html) {
	if(!error){
		var $ = cheerio.load(html);

		$('.widefat tr').each(function() {

			var release = $(this);

			// Collect data
			var info = {
				version: release.find('td').eq(0).children('b').text(),
				link: 'https://codex.wordpress.org'+release.find('td').find('a').attr('href'),
				date: release.find('td').eq(1).text().replace(/(\r\n|\n|\r)/gm,"").trim(),
				musician: release.find('td').eq(2).text().replace(/(\r\n|\n|\r)/gm,"").trim(),
				changelog: 'https://codex.wordpress.org'+release.find('td').eq(3).children('a').attr('href'),
				blog: release.find('td').eq(4).children('a').attr('href'),
				image: ''
			}

			// Download image from Google Search
			var download = function(uri, filename, callback){
				request.head(uri, function(err, res, body){
					request(uri).pipe(fs.createWriteStream('./images/'+filename)).on('close', callback);
				});
			};

			// Ronan Boren is the only one in the WP release history who is not a Jazz musician.
			// "We’re breaking the tradition of naming releases after jazz musicians to congratulate Ryan Boren on his new son (and first WP baby) Ronan."
			// Source: 2.0.5: https://wordpress.org/news/2006/10/205-ronan/
			if(info.musician && info.musician !== 'Ronan Boren') {
				
				// Search Google for public domain images
				request({
					url: 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&as_filetype=jpg&as_rights=cc_publicdomain&q='+info.musician.replace(/ /g, '+'),
					json: true
				}, function (error, response, body) {

					if (!error && response.statusCode === 200) {
						
						fs.exists('./images/'+info.musician.replace(/ /g, '+')+'.jpg', function(exists) {
						  if (!exists) {
						  	if(body.responseData.results[0]) {
						  		download(body.responseData.results[0].url, info.musician.replace(/ /g, '+')+'.jpg', function(){});
						  	}
						  }
						});
					}
				})
				
				// Add image name to info object
				info.image = info.musician.replace(/ /g, '+')+'.jpg';

				// Push to Jazzgreats
				jazzgreats.push(info);

			}
		})

}

fs.writeFile('data.json', JSON.stringify(jazzgreats, null, 4), function(err){

})

});