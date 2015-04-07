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
		return Events.find({}, {sort: {created_date: -1}});
	},

	movies: function () {
		// store event id when event is selected
		var eventId = Session.get('selectedEventId');

		// get movie list of selected event
		return Movies.find({event_id: eventId}, {sort: {votes: -1}});
	},

	selectedEvent: function () {
		return Session.get('selectedEventId') ? true : false;
	},

	isEventMovie: function () {
		// if no movies in event return false for template to render "Add a movie"
		return Movies.findOne({event_id: Session.get('selectedEventId')}) ? true : false;
	},

	isFollowing: function () {
		var event = this;

		return event.followers_id.indexOf(Meteor.userId()) > -1 ? true : false
	},

	eventNotCreated: function () {
		return Session.get('selectedEventId') ? false : true;
	},

	notLoggedIn: function () {
		return Meteor.userId() ? false : true;
	}

});

/*****************************************************************************/
/* EventsLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.EventsLayout.created = function () {
};

Template.EventsLayout.rendered = function () {
	Session.set('isEditing', false);
};

Template.EventsLayout.destroyed = function () {
};
