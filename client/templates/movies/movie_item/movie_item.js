/*****************************************************************************/
/* MovieItem: Event Handlers */
/*****************************************************************************/
Template.MovieItem.events({
	'click [name=poster]': function () {
		// call moviedb api
		mdb.getMovieInfo(this.id);
		Session.set('selectedMovieId',  {id: this.id})
	},

	// 'click button.info': function () {
	// 	// call moviedb api
	// 	mdb.getMovieInfo(this.id);
	// 	Session.set('selectedMovieId',  {id: this.id})
	// },

	'click .delete': function () {
		Movies.remove(this._id)
	},

	'click .upvote': function (e, tmpl) {
		console.log("event_id: " + this.event_id + "; movieId: " + this._id);
		Meteor.call('upvote', this.event_id, this._id);
	},

	'click .downvote': function (e, tmpl) {
		console.log("event_id: " + this.event_id + "; movieId: " + this._id);
		Meteor.call('downvote', this.event_id, this._id);
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
	},

	isNotFollowing: function () {
		var userId = Meteor.userId()
		if (!! this.followers_id)
			return this.followers_id.indexOf(userId) > -1 ? false : true;
	},

	hasEvent: function () {
		if (!! this.event_id)
			return true;
	},

	releaseYear: function () {
		var date = this.release_date;
		return date.split("-")[0];
	},

	hasVotedClass: function () {
		var userId = Meteor.userId()
		if (!! this.voters_id)
			return this.voters_id.indexOf(userId) > -1 ? 'hasVoted' : '';
	},

	hasVoted: function () {
		var userId = Meteor.userId()
		if (!! this.voters_id)
			return this.voters_id.indexOf(userId) > -1 ? true : false;
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
