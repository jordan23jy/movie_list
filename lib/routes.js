Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'MoviesDiscoverController',
  action: 'action',
  where: 'client'
});


Router.route('/watchlist', {
  name: 'watchlist',
  controller: 'MovieListController',
  action: 'action',
  where: 'client'
});


Router.route('/eventcreate', {
  name: 'event.create',
  controller: 'EventCreateController',
  action: 'action',
  where: 'client'
});

Router.route('/discover', {
  name: 'discover',
  controller: 'MoviesDiscoverController',
  action: 'action',
  where: 'client'
});