/*****************************************************************************/
/* MovieItem: Event Handlers */
/*****************************************************************************/
Template.MovieItem.events({
	'click .post-content': function (e, tmpl) {
		e.preventDefault();

		var _id = $(e.target).find('div[name=movieItem]').attr('id');

		console.log(this._id);
		Movies.remove(this._id);
	}
});

/*****************************************************************************/
/* MovieItem: Helpers */
/*****************************************************************************/
Template.MovieItem.helpers({

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

