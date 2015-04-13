EventController = RouteController.extend({
  waitOn: function () {
    var _id = this.params._id;
    this.subscribe('event', _id).wait();
    this.subscribe('movies', {sort: {votes: -1}}).wait();
  },

  data: function () {
    var _id = this.params._id
    return Events.findOne({_id: _id});
  },

  event: function () {
    this.render('EventLayout', {});
  },

  edit: function () {
    this.render('EventCreate', {});
  }
});