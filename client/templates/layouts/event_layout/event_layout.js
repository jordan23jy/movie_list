/*****************************************************************************/
/* EventLayout: Event Handlers */
/*****************************************************************************/
Template.EventLayout.events({
	'click [name=accept]': function () {
		var event_id = this._id;

		Meteor.call('accept', event_id);
	}
});

/*****************************************************************************/
/* EventLayout: Helpers */
/*****************************************************************************/
Template.EventLayout.helpers({
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

	selectedEvent: function () {
		return Session.get('selectedEventId') ? true : false;
	},

	checkMovie: function () {
		// if no movies in event return false for template to render "Add a movie"
		return Movies.findOne({event_id: Session.get('selectedEventId')}) ? true : false;
	},
	isNotFollowing: function () {
		// var events = this;
		var userId = Meteor.userId();
		return Events.find({followers_id: userId}) ? false : true;
		// return events.followers_id.indexOf(userId) > -1 ? false : true;
	},

	isNotLoggedIn: function () {
		return Meteor.userId() ? false : true;
	},

	isEditing: function () {
		return Session.get('isEditing').status;
	}
});

/*****************************************************************************/
/* EventLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.EventLayout.created = function () {
};

Template.EventLayout.rendered = function () {
	Session.set('selectedEventId', this.data._id);
};

Template.EventLayout.destroyed = function () {
};

