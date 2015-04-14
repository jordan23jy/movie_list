/*****************************************************************************/
/* MoviesDiscoverLayout: Event Handlers */
/*****************************************************************************/
Template.MoviesDiscoverLayout.events({
	'click #load-more': function () {

		var movieList = MovieDiscover.find().fetch();
		var pages = [];

		// store pages loaded in api
		for (var i = 0; i < movieList.length; i++) {
			pages.push(movieList[i].page);
		}
		//rearrange pages highest to lowest
		pages.sort(function(a, b) {return b-a});
		var latestPageCalled = pages[0];
		var newPage = latestPageCalled + 1;
		// console.log('latest page ' + latestPageCalled);

		var year = Session.get('selectedSearch').year;
		var genre = Session.get('selectedSearch').genre;
		console.log(pages);
		// load movies from previous page number + 1
		mdb.movieDiscover(newPage, year, genre);
	},
});

/*****************************************************************************/
/* MoviesDiscoverLayout: Helpers */
/*****************************************************************************/
Template.MoviesDiscoverLayout.helpers({
	movie: function () {
		// return Session.get('movieDiscover')
		var movieList = MovieDiscover.find().fetch();
		var listArray = [];

		// run through api dataset and return an array of results
		for (var i = 0, currentArray; i < movieList.length; i++) {
			currentArray = movieList[i].results
			// for each page extract its results into an array
			for (var j = 0; j < currentArray.length; j++) {
				listArray.push(currentArray[j]);
			}
		}
		return listArray;
	}
});

/*****************************************************************************/
/* MoviesDiscoverLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MoviesDiscoverLayout.created = function () {
};

Template.MoviesDiscoverLayout.rendered = function () {
	// remove data
	MovieDiscover.remove({});
	// load first page of data
	mdb.movieDiscover(1);

	// $(window).scroll(function () {
	//   if ($(document).height() <= $(window).scrollTop() + $(window).height() + 2) {
	//       console.log("End Of The Page");

	//       var movieList = MovieDiscover.find().fetch();
	//       var pages = [];

	//       // store pages loaded in api
	//       for (var i = 0; i < movieList.length; i++) {
	//       	pages.push(movieList[i].page);
	//       }
	//       console.log(pages.reverse());

	//       var latestPageCalled = pages[0];
	//       var newPage = latestPageCalled + 1;
	//       // console.log('latest page ' + latestPageCalled);

	//       // load movies from previous page number + 1
	//       mdb.movieDiscover(newPage);
	//   }
	// });
};

Template.MoviesDiscoverLayout.destroyed = function () {
};

