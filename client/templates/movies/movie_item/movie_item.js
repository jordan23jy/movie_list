/*****************************************************************************/
/* MovieItem: Event Handlers */
/*****************************************************************************/
Template.MovieItem.events({
	'click [name=poster]': function () {

		// return Session.set('selectedMovieId', {id: this.id})
		mdb.getMovieInfo(this.id);
	},

	'click .delete': function () {
		Movies.remove(this._id)
	},

	'click .vote': function () {
		Movies.update({_id: this._id}, {$inc: {votesSum: 1}})
	}
});

/*****************************************************************************/
/* MovieItem: Helpers */
/*****************************************************************************/
Template.MovieItem.helpers({
	backdropUrl: function () {
		var discover = this;
		var SIZE = "w780";

		return images_uri + SIZE + this.backdrop_path
	},

	posterUrl: function () {
		var discover = this;
		var SIZE = "w185";

		return images_uri + SIZE + this.poster_path
	}
});

/*****************************************************************************/
/* MovieItem: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieItem.created = function () {
};

Template.MovieItem.rendered = function () {
};

Template.MovieItem.destroyed = function () {
};

var images_uri = "http://image.tmdb.org/t/p/";