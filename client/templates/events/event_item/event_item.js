/*****************************************************************************/
/* EventItem: Event Handlers */
/*****************************************************************************/
Template.EventItem.events({
	'click .event-content': function () {

		Session.set('selectedEventId', this._id);
	}
});

/*****************************************************************************/
/* EventItem: Helpers */
/*****************************************************************************/
Template.EventItem.helpers({
	isMyEvent: function () {
		var event = this;
		return event.created_by_id === Meteor.userId();
	},

	hiddenClass: function(field) {
		return isSet(this[field]) ? '' : '{display: none}';
	},

	followers: function () {
		var event = this;
		return event.followers.join(", ");
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
