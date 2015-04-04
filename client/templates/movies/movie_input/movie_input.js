
/*****************************************************************************/
/* MovieInput: Event Handlers */
/*****************************************************************************/
Template.MovieInput.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();

		var a = getFormData('form[name=movieadd]');
		console.log(a);


		var $movieTitle = $(e.target).find('input[name=movieTitle]');

		var post = {
			movieTitle: $movieTitle.val()
		}

		// validate if post is not empty
		if (!post.movieTitle) {
			return alert('Please fill in movie title');
		};

		Meteor.call('movieInsert', post, function (err, res) {
			if (err) {
				console.log(err.reason)
			} else {
				$movieTitle.val('')
			}
		});
	},

	// search for movies when typing
	'keyup .movieadd input[name="movieTitle"]': function(e, tmpl) {
		e.preventDefault();

		// User is navigating autocomplete list
		if ([38, 40].indexOf(e.which) > -1) {

			var checked = $('input[type=radio]:checked');
			checked.prop('checked', false);

			if (e.which == 38) { // uparrow

				if (checked.length == 0) {
					console.log('LAST!');
					$('input[type=radio]:last').prop('checked', true);

				} else {
					checked.prev().prev().prop('checked', true);
					console.log(checked.prev().text());
				}


			} else if (e.which == 40) { // downarrow
				if (checked.length == 0) {
					$('input[type=radio]:first').prop('checked', true);
				} else {
					checked.next().next().prop('checked', true);
					console.log(checked.next().next().next().text());
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

				// get list from movie db
				getLists(e.target.value);
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

getFormData = function(selector) {
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
	style: function() {
		var text = $('.movieadd input[type=text]');
		var textTop = $('.movieadd input[type=text]').offset().top + 4;
		var textHeight = $('.movieadd input[type=text]').height();
		var top = textTop + textHeight;
		var textLeft = $('.movieadd input[type=text]').offset().left;
		return "top:" + top + "px; left:" + textLeft + "px;";
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
};

Template.MovieInput.rendered = function () {
	// Meteor.typehead.inject();
};

Template.MovieInput.destroyed = function () {
};

