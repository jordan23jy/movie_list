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
      // set as current event when submitted
      var username = Meteor.user().username;
      var userId = Meteor.userId();

      var event = _.extend(eventAttribute, {
         created_by_id: userId,
         created_date: new Date(),
         followers: [username],
         followers_id: [userId]
      })

      // var originalUrl = Router.current();
      // console.log(originalUrl);

      // insert data from form and return id to create url for shortening
      var eventId = Events.insert(event);

      // // event url
      // var url = url + '/'+ eventId;

      // // shorten link url
      // if (Meteor.isServer) {
      //    var shortUrl = Bitly.shortenUrl(url);
      // }

      // Events.update({_id: eventId}, {$set: {shortUrl: shortUrl}});

      return {
         _id: eventId
      }
   },

   eventEdit: function (up) {
      var userId = Meteor.userId();
      var event_id = up.event_id;
      var eventDetails = up.eventDetails;

      check(userId, String);
      check(event_id, String);

      return Events.update(event_id, {$set: eventDetails});
   },

   upvote: function (eventId, movieId) {
      var userId = Meteor.userId();
      var username = Meteor.user().username;
      check(eventId, String);
      check(movieId, String);
      check(username, String);
      check(userId, String);

      // find all events where this user has not voted yet
      var affected = Movies.update({
         event_id: eventId,
         _id: movieId,
         voters_id: {$ne: userId}
      }, {
         $addToSet: {
            voters_username: username,
            voters_id: userId
         },
         $inc: {votes: 1}
      })

      if (!affected) {
         throw new Meteor.Error('invalid', 'You were unable to upvote for that movie');
      }
   },

   downvote: function (eventId, movieId) {
      var userId = Meteor.userId();
      var username = Meteor.user().username;
      check(eventId, String);
      check(movieId, String);
      check(username, String);
      check(userId, String);

      // find all events where this user has not voted yet
      var affected = Movies.update({
         event_id: eventId,
         _id: movieId,
         voters_id: userId
      }, {
         $pull: {
            voters_username: username,
            voters_id: userId
         },
         $inc: {votes: -1}
      })

      if (!affected) {
         throw new Meteor.Error('invalid', 'You were unable to downvote for that movie');
      }
   },

   follow: function (eventId) {
      var username = Meteor.user().username;
      var userId = Meteor.userId();

      check(username, String);
      check(userId, String);

      Events.update({_id: eventId}, {
         $addToSet: {
            followers: username,
            followers_id: userId
         }
      })
   },

   unfollow: function (eventId) {
      var username = Meteor.user().username;
      var userId = Meteor.userId();

      check(username, String);
      check(userId, String);

      Events.update(
         {
            _id: eventId,
            followers_id: userId
         },
         {
         $pull: {
            followers: username,
            followers_id: userId
         }
      })
   },

   removeEvent: function (eventId) {
      Events.remove(eventId);
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