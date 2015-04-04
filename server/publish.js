/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('movies', function (/* args */) {
  return Movies.find();
});

Meteor.publish('nba', function (/* args */) {
  return Nba.find();
});