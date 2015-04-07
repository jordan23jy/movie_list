MoviesController = RouteController.extend({
  waitOn: function () {
    // set up the subscriptions for the route and optionally
    // wait on them like this:
    //
    // this.subscribe('item', this.params._id).wait();
    //
    // "Waiting" on a subscription does not block. Instead,
    // the subscription handle is added to a reactive list
    // and when all items in this list are ready, this.ready()
    // returns true in any of your route functions.
    this.subscribe('movies')
  },

  data: function () {
    // return a global data context like this:
    // Items.findOne({_id: this.params._id});
    // data context: movie discover from moviedb
    mdb.movieDiscover();
  },

  discover: function () {
    this.render('MoviesDiscoverLayout', {data: Session.get('getMovieInfo')});
  },

  watchlist: function () {
    this.render('MoviesWatchlistLayout', {data: Session.get('getMovieInfo')});
  }
});
