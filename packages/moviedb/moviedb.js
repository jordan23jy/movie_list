MovieDB = {};

MovieDB.getList = function (query) {
	var MOVIEDB_KEY = process.env.MOVIEDB_KEY;

	var API = "http://api.themoviedb.org/3/search/movie?";
	var params = {
		query: query,
		api_key: MOVIEDB_KEY,
		page: 1,
	}

	var movieResponse = Meteor.http.get(
		"http://api.themoviedb.org/3/search/movie?",
		{
			timeout: 5000,
			params: {
				"query": query,
				"api_key": MOVIEDB_KEY,
				"page": 1,
			},
		}
	);

	if (movieResponse.statusCode === !200) {
		throw new Meteor.Error(movieResponse.data.status_code, "MovieDB call failed with error: " + movieResponse.data.status_txt);
	} else {
		return Session.set('movieSerch', movieResponse.data.results);
	}
}

