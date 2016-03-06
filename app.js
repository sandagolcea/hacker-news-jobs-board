var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var app = express();

app.get('/', function(req, res){
	var url = 'https://news.ycombinator.com/item?id=11012044';
	var jobs = [];

	request(url, function(error, response, html){
		res.send('Hello, please check console.log for comments.');

		if (!error) {
			var $ = cheerio.load(html);

			// json unused , since we're not passing any threadId in the path atm
			var json = {
				id: 0,
				comments: []
			}

			$('.athing').filter(function() {
				var data = $(this);
				var comment = {
					userId: '',
					commentId: 0,
					html: '',
					plainText: '',
					date: '',
					title: ''
				};

				comment.userId = data.find('.comhead').find('a').first().text();
				var commentId = data.find('.comhead').find('a').last().attr('href');
				if (commentId) {
					comment.commentId = commentId.substr(commentId.indexOf("=") + 1);
				}
				comment.html = data.find('.comment').find('span').first();
				comment.plainText = data.find('.comment').find('span').children().first().text();
				comment.date = data.find('.comhead').find('.age').text();

				// grabbing the title from the main message:
				// before the first paragraph <p>; and after <span class='.c00'> 
				var myComment  = String(comment.html);
				comment.title = myComment.substr(0, myComment.indexOf("<p>")).substr(myComment.indexOf(">") + 1);

				// Just to give you a taste:
				console.log(
					'\n\n***Comment ' + comment.commentId
					+ '\nby: ' + comment.userId + ' at: ' + comment.date
					+ '\ntitle: ' + comment.title
					+ '\ncomment: ' + comment.plainText
					);
			});
		}
	});
});

app.listen(3000, function() {
	console.log('..Listening on port 3000.');
});
