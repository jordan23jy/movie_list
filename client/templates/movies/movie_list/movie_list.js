/*****************************************************************************/
/* MovieList: Event Handlers */
/*****************************************************************************/
Template.MovieList.events({
});

/*****************************************************************************/
/* MovieList: Helpers */
/*****************************************************************************/
Template.MovieList.helpers({
	movie: function () {
		// store event id when event is selected
		var eventId = Session.get('selectedEventId');

		// get movie list of selected event
		return Movies.find({event_id: eventId}, {sort: {votes: -1}});
	},
});

/*****************************************************************************/
/* MovieList: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieList.created = function () {
};

Template.MovieList.rendered = function () {
	this.find('.wrapper')._uihooks = {
		moveElement: function (node, next) {
			var $node = $(node), $next = $(next);

			// get current position and element height
			var oldTop = $node.offset().top;
			var height = $node.outerHeight(true);

			// find all elements between next and node
			var $inBetween = $next.nextUntil(node);
			// if opposite direction
			if ($inBetween.length === 0)
				$inBetween = $node.nextUntil(next);

			// put node in place with new position
			$node.insertBefore(next);

			// measure new top
			var newTop = $node.offset().top;

			// artificially move node back to where it was before
			// remove animation and place to old position temporarily
			$node
				.removeClass('animate')
				.css('top', oldTop - newTop);

			// push every other element down or up to put them back
			$inBetween
				.removeClass('animate')
				.css('top', oldTop < newTop ? height : -1 * height);

			// force a redraw
			$node.offset();

			// reset everything to 0, animated
			$node.addClass('animate').css('top', 0);
			$inBetween.addClass('animate').css('top', 0);
		}
	}
};

Template.MovieList.destroyed = function () {
};
