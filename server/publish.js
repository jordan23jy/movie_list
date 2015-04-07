/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('movies', function (options) {
  return Movies.find({}, options);
});

Meteor.publish('events', function (userId, options) {
  return Events.find({followers_id: userId}, options);
});

Meteor.publish('event', function (id) {
	return Events.find({_id: id});
})