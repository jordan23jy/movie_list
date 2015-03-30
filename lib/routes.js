Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});


Router.route('/watchlist', {
  name: 'watchlist.page',
  controller: 'MovieListController',
  action: 'action',
  where: 'client'
});