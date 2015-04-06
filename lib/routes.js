Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'MoviesController',
  action: 'discover',
  where: 'client'
});

Router.route('/watchlist', {
  name: 'watchlist',
  controller: 'MoviesController',
  action: 'watchlist',
  where: 'client'
});


Router.route('/events', {
  name: 'events',
  controller: 'EventsController',
  action: 'action',
  where: 'client'
});
