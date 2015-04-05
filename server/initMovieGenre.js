Meteor.startup(function() {

	function fill(col, source, map) {
		// remove collection
		col.remove({});

		// parse json file and map if needed
		JSON.parse(Assets.getText(source)).forEach(function(it) {
			col.insert(typeof map === 'function' ? map(it) : it);
		});
	}

	// get data and store in MovieGenre collection
	fill(MovieGenre, 'movie_genre.json');

});