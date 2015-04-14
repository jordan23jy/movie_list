/*****************************************************************************/
/* MovieInput: Event Handlers */
/*****************************************************************************/
Template.MovieInput.events({
	'submit form, click .movieadd input[type=radio]': function (e, tmpl) {
		e.preventDefault();

		// var movieData = getFormData('form[name=movieadd]');
		var $query = $(e.target).find('input[name=query]');

		// get moviedb movie id from list that is currently checked in DOM
		var movieId = $('input[type=radio]:checked').attr('id');

		// movieId of moviedb with selection from autocomplete suggestion
		var autocompleteId = getFormData('form').autocomplete;

		// insert selected movie into database with selected movie on autocomplete
		if (autocompleteId) {
			mdb.insertMovieInfo(autocompleteId);
			$query.val('');
		} else {
			alert('Select from movie list');
		}

		clearAutocomplete();
	},



	// search for movies when typing
	'keyup .searchbox': function(e, tmpl) {
		e.preventDefault();
		var $query = $('form').find('input[name=query]');

		// User is navigating autocomplete list
		if ([38, 40, 27].indexOf(e.which) > -1) {
			// if esc then clear search query
			if (e.which == 27) {
				$query.val('');
				clearAutocomplete();
			}

			var checked = $('input[type=radio]:checked');
			checked.prop('checked', false);

			// uparrow
			if (e.which == 38) {
				// if no item is checked, check the last item
				if (checked.length == 0) {
					$('input[type=radio]:last').prop('checked', true);
				} else {
					// check the previous item on the list upwards
					checked.prev().prev().prop('checked', true);
				}
			// downarrow
			} else if (e.which == 40) {
				// if no item is checked, check the first item
				if (checked.length == 0) {
					$('input[type=radio]:first').prop('checked', true);
				} else {
					// check the next item on the list downward
					checked.next().next().prop('checked', true);
				}
			}
		}

		// User is just typing
		else {
			Session.set('movieSearch', 'loading-autocomplete');
			// Don't search for one letter
			if (e.target.value.length < 2) {
				clearAutocomplete();
				return false;
			}


			// Only search when typing stopped, rotten has API limits:
			// 5 searches a second and 10'000 searches a day
			Meteor.clearTimeout(Session.get("typingTimer"));

			var typingTimer = Meteor.setTimeout(function(){
				// clear all checked properties in list when typing
				$('input[name=autocomplete]').prop('checked',false);

				// API: get list from movie db
				mdb.getLists(e.target.value);
			}, 700);

			Session.set("typingTimer", typingTimer);
		}

	},

	// Clear autocomplete on blur
	'blur input[name=title]': function(e, tmpl) {
		// After item has been added, clear autocomplete
		Meteor.setTimeout(function(){
			clearAutocomplete();
		}, 500);
	}
});

var clearAutocomplete = function() {
	Meteor.clearTimeout(Session.get("typingTimer"));
	Session.set('movieSearch', false);
}

var getFormData = function(selector) {
	var data = {};

	$(selector).serializeArray().forEach(function(obj) {
		if (obj.value) {
			data[obj.name] = obj.value;
		}
	});

	return data;
}





/*****************************************************************************/
/* MovieInput: Helpers */
/*****************************************************************************/
Template.MovieInput.helpers({

	// get autocomplete contents
	autocompleteLoading: function () {
		return Session.get('movieSearch') === 'loading-autocomplete' ? true : false;
	},
	autocomplete: function () {
		return Session.get('movieSearch');
	},
	movie: function() {
		Meteor.call('getMovies', Session.get('query'), function(err, results) {
			console.log(JSON.parse(results));

		});
	}
});

/*****************************************************************************/
/* MovieInput: Lifecycle Hooks */
/*****************************************************************************/
Template.MovieInput.created = function () {
	clearAutocomplete()
};

Template.MovieInput.rendered = function () {
	// Meteor.typehead.inject();
};

Template.MovieInput.destroyed = function () {
};

