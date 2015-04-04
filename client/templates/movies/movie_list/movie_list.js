/*****************************************************************************/
/* MovieList: Event Handlers */
/*****************************************************************************/
Template.MovieList.events({

});

/*****************************************************************************/
/* MovieList: Helpers */
/*****************************************************************************/
Template.MovieList.helpers({
	movies: function () {
		return Movies.find();
	}
});

/*****************************************************************************/
/* MovieList: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieList.created = function () {
};

Template.MovieList.rendered = function () {
};

Template.MovieList.destroyed = function () {
};
