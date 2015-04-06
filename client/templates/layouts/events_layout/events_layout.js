/*****************************************************************************/
/* EventsLayout: Event Handlers */
/*****************************************************************************/
Template.EventsLayout.events({
});

/*****************************************************************************/
/* EventsLayout: Helpers */
/*****************************************************************************/
Template.EventsLayout.helpers({
	events: function () {
		return Events.find();
	},

	movies: function () {
		// var events = this;

		// store event id when event is selected
		var eventId = Session.get('selectedEventId');

		// get movie list of selected event
		return Movies.find({event_id: eventId});
	},

});

/*****************************************************************************/
/* EventsLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.EventsLayout.created = function () {
};

Template.EventsLayout.rendered = function () {
};

Template.EventsLayout.destroyed = function () {
};
