EventController = RouteController.extend({
  waitOn: function () {
    var _id = this.params._id;
    this.subscribe('event', _id);
    this.subscribe('movies', {sort: {votes: -1}});
  },

  data: function () {
    var _id = this.params._id
    return Events.findOne({_id: _id});
  },

  event: function () {
    this.render('EventLayout', {data: Session.get('getMovieInfo')});
  },

  edit: function () {
    this.render('EventLayout', {data: Session.get('getMovieInfo')});
  }
});

