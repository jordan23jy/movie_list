EventsController = RouteController.extend({
  waitOn: function () {

    this.subscribe('events', Meteor.userId());
    this.subscribe('movies');
  },

  data: function () {
    return Events.find();
  },

  events: function () {
    this.render('EventsLayout', {});
  },

});
