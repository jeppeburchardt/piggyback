define(function(require) {

	'use strict';

	var P = require('p');

	var URL = 'https://www.googleapis.com/youtube/v3/search';
	var KEY = 'AIzaSyCdngeYwj6fhV_LGflDCXBPimzI6-zdvek';
	var RESULTS = 20;

	function YouTubeService() {

		// var self = this;

		this.search = function(term) {

			var deferred = P.defer();

			var request = new XMLHttpRequest();
			request.open('GET', URL + '?' + 'part=id,snippet&q=' + term + '&key=' + KEY + '&maxResults=' + RESULTS, true);

			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					// Success!
					var data = JSON.parse(request.responseText);
					deferred.resolve(convertResult(data));
				} else {
					// We reached our target server, but it returned an error
					deferred.reject(request.status);
				}
			};

			request.onerror = function(error) {
				// There was a connection error of some sort
				deferred.reject(error);
			};

			request.send();
			return deferred.promise;
		};

		function convertResult(result) {

			return (result.items.map(function(item) {
				return {
					title: item.snippet.title,
					id: item.id.videoId,
					image: (item.snippet.thumbnails.high || item.snippet.thumbnails.default).url,
					description: item.snippet.description,
					published: item.snippet.publishedAt,
					key: item.id.videoId,
				};
			}));

		}

	}

	return YouTubeService;

});