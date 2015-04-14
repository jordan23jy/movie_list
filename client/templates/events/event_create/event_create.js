/*****************************************************************************/
/* EventCreate: Event Handlers */
/*****************************************************************************/
Template.EventCreate.events({
	'submit form[name=create]': function (e, tmpl) {
		e.preventDefault();
		Session.set('submitError', false)

		// set as current event when submitted
		var eventDetails = getFormData('form');

		var errors = {};
		if (!eventDetails.event_name) {
			errors.event_name = "Please fill in event name";
			return Session.set('submitError', errors);
		}

		var eventId;
		Meteor.call('eventInsert', eventDetails, function(err, res) {
			if (err) {
				console.log(err.reason);
			} else {
				Session.set('selectedEventId', res._id);
				eventId = res._id;
				// clear form
				$('form input').val('');
				// closes modal window
				$('.event-create').modal('toggle');

			}
		});
		// var eventId = Session.get('selectedEventId')
		// go to event page
		Meteor.setTimeout(function() {
			Router.go('event.id', {_id: eventId});
		}, 500)

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
				Session.set('isEditing', {status: false})
				// clear form
				$('form input').val();
				// closes modal window
				$('.event-edit').modal('toggle');
			}
		})
	},

	'click button[name=cancel]': function () {
		Router.go('event.id', {_id: this._id});
		return Session.set('isEditing', false);
	},

	'click [name=save]': function () {
		Session.set('isEditing', {status: true});
		// console.log(this._id);
		Router.go('event.id', {_id: this._id});
	},

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