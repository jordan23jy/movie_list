mdb = {};

var api_key = "bb7d9cd6ceb264ab60f552ce6c17f4d0",
		base_uri = "http://api.themoviedb.org/3/",
		images_uri = "http://image.tmdb.org/t/p/";


mdb.getLists = function(query) {
	'use strict';

	var params = {
		query: query,
		api_key: api_key,
		page: 1,
	}

	$.ajax({
		dataType: "json",
		method: "GET",
		url: base_uri + "search/movie?",
		data: params,
		success: function(data) {
			console.log('called getLists');
			Session.set('movieSearch', data.results);
		},
		error: function(jqxhr, textStatus, error) {
			console.log("Request failed: " + textStatus + ", " + error);
		}
	});
}

mdb.insertMovieInfo = function(id) {
	'use strict'

	var params = {
		api_key: api_key,
		append_to_response: "credits",
	}
	$.ajax({
		dataType: "json",
		method: "GET",
		url: base_uri + "movie/" + id + "?",
		data: params,
		success: function(data) {
			insertMovieMethod(data);
		},
		error: function(jqxhr, textStatus, error) {
			console.log("Request failed: " + textStatus + ", " + error);
		}
	});
}

var insertMovieMethod = function(data) {

		var moviedbData = {
			// store data from moviedb database
			genre: data.genres,
			id: data.id,
			title: data.title,
			backdrop_path: data.backdrop_path,
			poster_path: data.poster_path,
			overview: data.overview,
			release_date: data.release_date,
			runtime: data.runtime,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
			credits: data.credits,

			// store data to be interacted and updated
			votes: {},
			votesSum: 0,
			youtube: '',
		}
		Meteor.call('movieInsert', moviedbData, function (err, res) {
		if (err)
			console.log(err.reason)
		});
	}

mdb.getMovieInfo = function(id) {
	'use strict'

	var params = {
		api_key: api_key,
		append_to_response: "credits",
	}
	$.ajax({
		dataType: "json",
		method: "GET",
		url: base_uri + "movie/" + id + "?",
		data: params,
		success: function(data) {
			console.log("Called getMovieInfo");
			return Session.set('getMovieInfo', data);
		},
		error: function(jqxhr, textStatus, error) {
			console.log("Request failed: " + textStatus + ", " + error);
		}
	});

	var addMovieDetails = function(data) {

		var moviedbData = {
			// store data from moviedb database
			genre: data.genres,
			movie_id: data.id,
			movie_title: data.title,
			poster_path: data.poster_path,
			overview: data.overview,
			release_date: data.release_date,
			runtime: data.runtime,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
			cast: {
				cast: data.credits.cast,
				crew: data.credits.crew,
			},

			// store data to be interacted and updated
			votes: {},
			votesSum: 0,
			youtube: '',
		}

		Meteor.call('movieInsert', moviedbData, function (err, res) {
			if (err)
				console.log(err.reason)
		});
	}
}




mdb.movieDiscover = function(page, genre, year) {

	var params = {
		api_key: api_key,
		page: page,
		with_genres: genre,
		year: year,
	}

	$.ajax({
		dataType: "json",
		method: "GET",
		url: base_uri + "discover/movie?",
		data: params,
		success: function(data) {
			console.log("called movieDiscover");
			Session.set('movieDiscover', data.results)
		},
		error: function(jqxhr, textStatus, error) {
			console.log("Request failed: " + textStatus + ", " + error);
		}
	})
}



var isSet = function(data) {
	if (!data || data == false || data == 'undefined' || typeof(data) == 'undefined'|| data.length == 0 || typeof(data) == 'object' && $.isEmptyObject(data)) {
		return false;
	} else {
		return true
	}
}

