searchRotten = function(query) {
	var API = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?callback=?";
	// var ROTTEN_TOMATOES_KEY = process.env.ROTTEN_TOMATOES_KEY;
	var params = {
		q: query,
		page_limit: 5,
		page: 1,
		apikey: "h7r36fsnbz7bzb87pz86tyh5",
	}
	$.getJSON(API, params, function(data) {
		Session.set('movieSearch', data.movies);
	})
	.fail(function(jqxhr, textStatus, error) {
		var err = textStatus + ", " + error;
		console.log("Request Failed: " + err);
	});
}

// http://api.rottentomatoes.com/api/public/v1.0/movies.json?callback=?q=get&apikey=jnbjt86kwennch2fh6w9adb2