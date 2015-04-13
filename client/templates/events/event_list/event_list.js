/*****************************************************************************/
/* EventList: Event Handlers */
/*****************************************************************************/
Template.EventList.events({
});

/*****************************************************************************/
/* EventList: Helpers */
/*****************************************************************************/
Template.EventList.helpers({
	events: function () {
		return Events.find({}, {sort: {created_date: -1}});
	},
});

/*****************************************************************************/
/* EventList: Lifecycle Hooks */
/*****************************************************************************/
Template.EventList.created = function () {
};

Template.EventList.rendered = function () {
	this.find('.wrapper')._uihooks = {

		removeElement: function (node) {
			$(node).fadeOut(function () {
				$(this).remove();
			})
		},

		insertElement: function (node, next) {
			$(node)
				.hide()
				.insertBefore(next)
				.fadeIn();
		}
	}
};

Template.EventList.destroyed = function () {
};

