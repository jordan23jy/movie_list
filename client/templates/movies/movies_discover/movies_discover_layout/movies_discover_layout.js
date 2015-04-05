/*****************************************************************************/
/* MoviesDiscoverLayout: Event Handlers */
/*****************************************************************************/
Template.MoviesDiscoverLayout.events({

	'click .genre': function() {

		var id = this._id;
		var genre = this.genre;
		Router.go('discover.genre', {genre: genre})
	}
});

/*****************************************************************************/
/* MoviesDiscoverLayout: Helpers */
/*****************************************************************************/
Template.MoviesDiscoverLayout.helpers({

});

/*****************************************************************************/
/* MoviesDiscoverLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MoviesDiscoverLayout.created = function () {
};

Template.MoviesDiscoverLayout.rendered = function () {
};

Template.MoviesDiscoverLayout.destroyed = function () {
};

/**************************************************************/
/* Temp */
/**************************************************************/
/*
	movieGenre: function() {
		return MovieGenre.find();
	},

	genreUpperCase: function() {
		var movie_genre = this;

		return this.genre.toUpperCase();
	},

	imgUrl: function() {
		var movie_genre = this;

		var img_uri = "http://image.tmdb.org/t/p/";
		var IMG_SIZE = "w1280";

		return img_uri + IMG_SIZE + this.img_backdrop_path;
	}

*/