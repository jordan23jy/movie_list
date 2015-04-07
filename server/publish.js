/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('movies', function (/* args */) {
  return Movies.find();
});

Meteor.publish('events', function (userId) {
  return Events.find({followers_id: userId});
});

Meteor.publish('event', function (id) {
	return Events.find({_id: id});
})