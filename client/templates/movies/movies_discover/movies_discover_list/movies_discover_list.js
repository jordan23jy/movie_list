/*****************************************************************************/
/* MoviesDiscoverList: Event Handlers */
/*****************************************************************************/
Template.MoviesDiscoverList.events({
});

/*****************************************************************************/
/* MoviesDiscoverList: Helpers */
/*****************************************************************************/
Template.MoviesDiscoverList.helpers({
	movie: function () {
		return Session.get('movieDiscover')
	}
});

/*****************************************************************************/
/* MoviesDiscoverList: Lifecycle Hooks */
/*****************************************************************************/
Template.MoviesDiscoverList.created = function () {
};

Template.MoviesDiscoverList.rendered = function () {
};

Template.MoviesDiscoverList.destroyed = function () {
};
