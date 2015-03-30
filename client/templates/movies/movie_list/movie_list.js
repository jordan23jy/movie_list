/*****************************************************************************/
/* MovieList: Event Handlers */
/*****************************************************************************/
Template.MovieList.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();

		var $movieTitle = $(e.target).find('input[name=movieTitle]');

		var post = {
			movieTitle: $movieTitle.val()
		}

		// validate if post is not empty
		if (!post.movieTitle) {
			return alert('Please fill in movie title');
		};

		Meteor.call('movieInsert', post, function (err, res) {
			if (err) {
				console.log(err.reason)
			} else {
				$movieTitle.val('')
			}
		});



	}
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
