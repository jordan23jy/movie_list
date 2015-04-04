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
   }

});
