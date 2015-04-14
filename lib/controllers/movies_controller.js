MoviesController = RouteController.extend({
  waitOn: function () {
    this.subscribe('movies', {sort: {votes: -1}}).wait()
  },

  data: function () {
    // data context: movie discover from moviedb
    // return mdb.movieDiscover();
  },

  discover: function () {
    this.render('MoviesDiscoverLayout', {data: Session.get('getMovieInfo')});
  }
});

