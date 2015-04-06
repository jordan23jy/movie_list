/*****************************************************************************/
/* MoviesWatchlistLayout: Event Handlers */
/*****************************************************************************/
Template.MoviesWatchlistLayout.events({
	'click button': function () {

	}
});

/*****************************************************************************/
/* MoviesWatchlistLayout: Helpers */
/*****************************************************************************/
Template.MoviesWatchlistLayout.helpers({
	movie: function() {
		return Movies.find();
	}
});

/*****************************************************************************/
/* MoviesWatchlistLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MoviesWatchlistLayout.created = function () {
};

Template.MoviesWatchlistLayout.rendered = function () {
};

Template.MoviesWatchlistLayout.destroyed = function () {
};
