/*****************************************************************************/
/* MoviesDiscoverLayout: Event Handlers */
/*****************************************************************************/
Template.MoviesDiscoverLayout.events({
});

/*****************************************************************************/
/* MoviesDiscoverLayout: Helpers */
/*****************************************************************************/
Template.MoviesDiscoverLayout.helpers({
	movie: function () {
		return Session.get('movieDiscover')
	}
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
