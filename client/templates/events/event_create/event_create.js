/*****************************************************************************/
/* EventCreate: Event Handlers */
/*****************************************************************************/
Template.EventCreate.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();

		// set as current event when submitted



		var eventDetails = getFormData('form');
		var username = Meteor.user().username;
		var userId = Meteor.userId();

		_.extend(eventDetails, {
			created_by_id: userId,
			created_date: new Date(),
			followers: [username]
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
	}

});

/*****************************************************************************/
/* EventCreate: Lifecycle Hooks */
/*****************************************************************************/
Template.EventCreate.created = function () {
};

Template.EventCreate.rendered = function () {
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