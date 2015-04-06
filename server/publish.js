/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('movies', function (/* args */) {
  return Movies.find();
});

Meteor.publish('events', function (/* args */) {
  return Events.find();
});