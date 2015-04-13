/*****************************************************************************/
/* Client and Server Methods */
/*****************************************************************************/
Meteor.methods({
   increment: 5,

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
      console.log(this.increment);

      var user = getUserName();
      var userId = Meteor.userId();

      check(user, String);
      check(userId, String);

      var event = _.extend(eventAttribute, {
         created_by_id: userId,
         created_date: new Date(),
         followers: [user],
         followers_id: [userId]
      });

      // insert data from form and return id to create url for shortening
      var eventId = Events.insert(event);

      return {
         _id: eventId
      }

      // // event url
      // var url = url + '/'+ eventId;

      // // shorten link url
      // if (Meteor.isServer) {
      //    var shortUrl = Bitly.shortenUrl(url);
      // }

      // Events.update({_id: eventId}, {$set: {shortUrl: shortUrl}});


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
      var user  = getUserName();

      check(eventId, String);
      check(movieId, String);
      check(userId, String);
      check(user, String)

      // find all events where this user has not voted yet
      var affected = Movies.update({
         event_id: eventId,
         _id: movieId,
         voters_id: {$ne: userId}
      }, {
         $addToSet: {
            voters_username: user,
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
      var user  = getUserName();

      check(eventId, String);
      check(movieId, String);
      check(user, String);
      check(userId, String);

      // find all events where this user has not voted yet
      var affected = Movies.update({
         event_id: eventId,
         _id: movieId,
         voters_id: userId
      }, {
         $pull: {
            voters_username: user,
            voters_id: userId
         },
         $inc: {votes: -1}
      })

      if (!affected) {
         throw new Meteor.Error('invalid', 'You were unable to downvote for that movie');
      }
   },

   follow: function (eventId) {
      var user  = getUserName();
      var userId = Meteor.userId();

      check(user, String);
      check(userId, String);

      Events.update({_id: eventId}, {
         $addToSet: {
            followers: username,
            followers_id: userId
         }
      })
   },

   unfollow: function (eventId) {
      var user  = getUserName();
      var userId = Meteor.userId();

      check(user, String);
      check(userId, String);

      Events.update(
         {
            _id: eventId,
            followers_id: userId
         },
         {
         $pull: {
            followers: user,
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
getUserName = function () {
   // username from manual log in
   var username = Meteor.user().username;
   // name from facebook log in
   var facebookName = Meteor.user().profile.name;
   var user;
   //user is either username or facebook name
   username ? user = username : user = facebookName;
   return user;
}