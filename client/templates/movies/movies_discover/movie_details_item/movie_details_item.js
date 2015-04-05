/*****************************************************************************/
/* MovieDetailsItem: Event Handlers */
/*****************************************************************************/
Template.MovieDetailsItem.events({
});

/*****************************************************************************/
/* MovieDetailsItem: Helpers */
/*****************************************************************************/
Template.MovieDetailsItem.helpers({
	backdropUrl: function () {
		var discover = this;
		var SIZE = "w780";

		return images_uri + SIZE + this.backdrop_path
	}
});

/*****************************************************************************/
/* MovieDetailsItem: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieDetailsItem.created = function () {
};

Template.MovieDetailsItem.rendered = function () {
};

Template.MovieDetailsItem.destroyed = function () {
};

var images_uri = "http://image.tmdb.org/t/p/";