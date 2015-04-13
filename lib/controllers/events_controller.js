EventsController = RouteController.extend({
  waitOn: function () {
    var userId = Meteor.userId();

    this.subscribe('events', userId, {sort: {created_date: -1}}).wait();
    this.subscribe('movies', {sort: {votes: -1}}).wait();
  },

  data: function () {
    return Events.find();
  },

  events: function () {
    // this.render('MovieItemInfo', {data: Session.get('getMovieInfo')})
    this.render('EventsLayout', {data: Session.get('getMovieInfo')});
  },

});
