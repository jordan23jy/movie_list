/*****************************************************************************/
/* EventItem: Event Handlers */
/*****************************************************************************/
Template.EventItem.events({
	'click .event-content': function () {

		Session.set('selectedEventId', this._id);
	},

	'click [name=eventUrl]': function () {
		return Router.go('event.id');
	},

	'click button[name=follow]': function () {
		return Meteor.call('follow', this._id);
	},

	'click button[name=unfollow]': function () {
		return Meteor.call('unfollow', this._id);
	},

	'click [name=edit]': function () {
		Session.set('isEditing', {status: true});
		Router.go('event.id')
	},

	'click [name=saveEdit]': function () {
		Session.set('isEditing', {status: false});
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
		if (!! event.followers)
			return event.followers.join(", ")
	},

	eventUrl: function () {
		var event = this;

	},

	isNotFollowing: function () {
		var userId = Meteor.userId()
		if (!! this.followers_id)
			return this.followers_id.indexOf(userId) > -1 ? false : true;
	},

	isOwner: function () {
		var event = this;
		return this.created_by_id === Meteor.userId() ? true : false;
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
