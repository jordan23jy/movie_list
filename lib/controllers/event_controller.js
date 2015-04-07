EventController = RouteController.extend({
  waitOn: function () {

    this.subscribe('event', this.params._id);
    this.subscribe('movies');
  },

  data: function () {
    return Events.findOne({_id: this.params._id});
  },

  event: function () {
    Session.set('selectedEventId', this.params._id);
    this.render('EventLayout', {});
  },

  edit: function () {
    Session.set('selectedEventId', this.params._id);
    this.render('EventLayout', {});
  }
});
