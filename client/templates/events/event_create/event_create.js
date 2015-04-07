/*****************************************************************************/
/* EventCreate: Event Handlers */
/*****************************************************************************/
Template.EventCreate.events({
	'submit form[name=create]': function (e, tmpl) {
		e.preventDefault();
		Session.set('submitError', false)

		// set as current event when submitted
		var eventDetails = getFormData('form');
		var username = Meteor.user().username;
		var userId = Meteor.userId();

		_.extend(eventDetails, {
			created_by_id: userId,
			created_date: new Date(),
			followers: [username],
			followers_id: [userId]
		})

		var errors = {};
		if (!eventDetails.event_name) {
			errors.event_name = "Please fill in event name";
			return Session.set('submitError', errors);
		}

		Meteor.call('eventInsert', eventDetails, function(err, res) {
			if (err) {
				console.log(err.reason);
			} else {
				Session.set('selectedEventId', res);
				$('form input').val('');
			}
		})
	},

	'submit form[name=edit]': function (e, tmpl) {
		e.preventDefault();
		Session.set('submitError', false)

		var update = {};

		// extract form details
		update.eventDetails = getFormData('form');
		update.event_id = this._id;

		var errors = {};
		if (!update.eventDetails.event_name) {
			errors.event_name = "Please fill in event name";
			return Session.set('submitError', errors);
		}

		// edit event when form in submitted
		// reset form and reset isEditing status to false
		Meteor.call('eventEdit', update, function(err, res) {
			if (err) {
				console.log(err.reason);
			} else {
				$('form input').val();
				Session.set('isEditing', {status: false})
			}
		})
	},

	'click button[name=cancel]': function () {
		return Session.set('isEditing', false);
	}

});

/*****************************************************************************/
/* EventCreate: Helpers */
/*****************************************************************************/
Template.EventCreate.helpers({
	errorMessage: function (field) {
		return Session.get('submitError')[field];
	},

	errorClass: function (field) {
		return !!Session.get('submitError')[field] ? 'has-error' : '';
	},

	isEditing: function () {
		return Session.get('isEditing').status;
	}
});

/*****************************************************************************/
/* EventCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.EventCreate.created = function () {
};

Template.EventCreate.rendered = function () {
	Session.set('submitError', false)
};

Template.EventCreate.destroyed = function () {
};

var getFormData = function(selector) {
	var data = {};

	$(selector).serializeArray().forEach(function(obj) {
		if (obj.value) {
			data[obj.name] = obj.value;
		}
	});

	return data;
}