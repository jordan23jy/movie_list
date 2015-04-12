/*****************************************************************************/
/* Trailer: Event Handlers */
/*****************************************************************************/
Template.Trailer.events({
});

/*****************************************************************************/
/* Trailer: Helpers */
/*****************************************************************************/
Template.Trailer.helpers({
	query: function () {
		// data context == movies
		var movies = this;
		var releaseYear = this.release_date.split("-")[0];
		var query = this.title + " " + releaseYear;
		return query;
	},

	encodedQuery: function () {
		return encodeURIComponent(this.query);
	}
});

/*****************************************************************************/
/* Trailer: Lifecycle Hooks */
/*****************************************************************************/
Template.Trailer.created = function () {
};

Template.Trailer.rendered = function () {
};

Template.Trailer.destroyed = function () {
};
