/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('movies', function (/* args */) {
  return Movies.find();
});

Meteor.publish('movie_genre', function (/* args */) {
  return MovieGenre.find();
});