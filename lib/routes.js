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
  action: 'events',
  where: 'client'
});

Router.route('/events/edit/:_id', {
  name: 'event.edit',
  controller: 'EventController',
  action: 'edit',
  where: 'client'
});

Router.route('/events/:_id', {
  name: 'event.id',
  controller: 'EventController',
  action: 'event',
  where: 'client'
});