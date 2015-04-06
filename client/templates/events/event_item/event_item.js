/*****************************************************************************/
/* EventItem: Event Handlers */
/*****************************************************************************/
Template.EventItem.events({
	'click .event-content': function () {
		var selectedEvent = Events.findOne({_id: this._id});
		Session.set('selectedEvent', selectedEvent);
	}
});

/*****************************************************************************/
/* EventItem: Helpers */
/*****************************************************************************/
Template.EventItem.helpers({
	selectedEvent: function () {
		return Session.get('selectedEvent').movies;
	}
});

/*****************************************************************************/
/* EventItem: Lifecycle Hooks */
/*****************************************************************************/
Template.EventItem.created = function () {
};

Template.EventItem.rendered = function () {
};

Template.EventItem.destroyed = function () {
};
