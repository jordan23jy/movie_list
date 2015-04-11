/*****************************************************************************/
/* MovieItem: Event Handlers */
/*****************************************************************************/
Template.MovieItem.events({
	'click [name=poster]': function () {

		// call moviedb api
		mdb.getMovieInfo(this.id);
		Session.set('selectedMovieId',  {id: this.id})
	},

	'click .delete': function () {
		Movies.remove(this._id)
	},

	'click .vote': function (e, tmpl) {
		console.log("event_id: " + this.event_id + "; movieId: " + this._id);
		Meteor.call('upvote', this.event_id, this._id);
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
	},

	voters: function () {
		if (this.voters_username) {
			return this.voters_username.join(', ');
		}
	},

	movieInfo: function () {
		return Session.get('getMovieInfo');
	},

	vote_average: function () {
		return this.vote_average.toFixed(1);
	}
});

/*****************************************************************************/
/* MovieItem: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieItem.created = function () {

};

Template.MovieItem.rendered = function () {
	$("input.rating").rating();
};

Template.MovieItem.destroyed = function () {
};

var images_uri = "http://image.tmdb.org/t/p/";
