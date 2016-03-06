var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var app = express();

app.get('/', function(req, res){
	var url = 'https://news.ycombinator.com/item?id=11012044';

	request(url, function(error, response, html){
		if (!error) {
			res.send('Response found. Please check logs.');
			var $ = cheerio.load(html);

			var firstThing = $('.athing').first().text();
			console.log('First comment marked with athing class: ' + firstThing);

			$('.athing').filter(function() {
				var data = $(this);
				eachThing = data.children().first().text();
				console.log('DATA: ' + eachThing);
			});
		}
	});
});

app.listen(3000, function() {
	console.log('..Listening on port 3000.');
});
