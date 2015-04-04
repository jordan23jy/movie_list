searchMoviedb = function(query) {
	var API = "http://api.themoviedb.org/3/search/movie?";
	var params = {
		query: query,
		page: 1,
		api_key: "bb7d9cd6ceb264ab60f552ce6c17f4d0",
	}
	$.getJSON(API, params, function(data) {
		console.log('called');
		Session.set('movieSearch', data.results);
	})
	.fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}

getLists = function(query) {

	var API = "http://api.themoviedb.org/3/search/movie?";
	var params = {
		query: query,
		api_key: "bb7d9cd6ceb264ab60f552ce6c17f4d0",
		page: 1,
	}

	$.ajax({
		dataType: "json",
		method: "GET",
		url: API,
		data: params,
		success: function(data) {
			console.log('called getLists');
			console.log(data.results);
			Session.set('movieSearch', data.results);
		},
		error: function(jqxhr, textStatus, error) {
			console.log("Request failed: " + textStatus + ", " + error);
		}
	})
}
