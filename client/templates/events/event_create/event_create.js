/*****************************************************************************/
/* EventCreate: Event Handlers */
/*****************************************************************************/
Template.EventCreate.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();

		var eventDetails = getFormData('form');

		_.extend(eventDetails, {
			created_by: Meteor.userId(),
			created_date: new Date(),
			followed_by: []
		})

		Meteor.call('eventInsert', eventDetails, function(err, res) {
			if (err)
				console.log(err.reason);
			else
				$('form').val('');
		})
	}
});

/*****************************************************************************/
/* EventCreate: Helpers */
/*****************************************************************************/
Template.EventCreate.helpers({
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