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
	}
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
