/*****************************************************************************/
/* MovieItemInfo: Event Handlers */
/*****************************************************************************/
Template.MovieItemInfo.events({
});

/*****************************************************************************/
/* MovieItemInfo: Helpers */
/*****************************************************************************/
Template.MovieItemInfo.helpers({
	data: function () {
		// return Session.get('getMovieInfo');
	},

	director: function () {
		var movieInfo = this;

		var crewArray = this.credits.crew;
		var directoryArray = [];

		for (var i = 0; i < 10; i++) {
				if (crewArray[i].job === "Director") {
					directoryArray.push(crewArray[i])
				}
		}
		return directoryArray;
	},

	cast: function () {
		var castArray = this.credits.cast;
		var castArrayLimit = []

		for (var i = 0; i < 10; i++) {
			castArrayLimit[i] = castArray[i];
		}
		return castArrayLimit;
	},

	genre: function () {
		var genre = [];

		$.each(this.genres, function(index, value) {
			genre[index] = value.name
		})
		return genre.join(', ');
	}

});

/*****************************************************************************/
/* MovieItemInfo: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieItemInfo.created = function () {
};

Template.MovieItemInfo.rendered = function () {

};

Template.MovieItemInfo.destroyed = function () {
};

var images_uri = "http://image.tmdb.org/t/p/";