/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({

   movieInsert: function (movieAttributes) {
      Movies.insert(movieAttributes);
   },

   getMovies: function (query) {
      console.log('called');
      return Meteor.http.get(
         "http://api.themoviedb.org/3/search/movie?",
         {
            timeout: 5000,
            params: {
               "query": query,
               "api_key": "bb7d9cd6ceb264ab60f552ce6c17f4d0",
               "page": 1,
            },
         }
      );
   },

   eventInsert: function (eventAttribute) {
      return Events.insert(eventAttribute);
   },

   upvote: function (eventId) {
      var userId = Meteor.userId();
      var username = Meteor.user().username;
      check(eventId, String);
      check(username, String);
      check(userId, String);

      // find all events where this user has not voted yet
      var affected = Movies.update({
         event_id: eventId,
         voters: {$ne: userId}
      }, {
         $addToSet: {voters: username},
         $inc: {votes: 1}
      })

      if (!affected) {
         throw new Meteor.Error('invalid', 'You were unable to upvote for that movie');
      }
   }

});


/**************************************************************/
/* Global Functions */
/**************************************************************/
isSet = function(data) {
   if (!data || data == false || data == 'undefined' || typeof(data) == 'undefined'|| data.length == 0 || typeof(data) == 'object' && $.isEmptyObject(data)) {
      return false;
   } else {
      return true
   }
}