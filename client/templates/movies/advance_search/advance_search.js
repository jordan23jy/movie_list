/*****************************************************************************/
/* AdvanceSearch: Event Handlers */
/*****************************************************************************/
Template.AdvanceSearch.events({
	'click .search': function () {

		console.log('clicked');
		// clear previous session
		MovieDiscover.remove({});


		// get value of year in options selected
		var year = $('select [name=year]option:selected').val();
		// extract only digits and convert to string
		year = year.match(/(\d)+/g);
		// check if available then conver to string
		year = !!year ? year.toString() : '';


		// get value of year in options selected
		var genre = $('select [name=genre]option:selected').val();
		// extract only digits and convert to string
		genre = genre.match(/(\d)+/g);
		// check if available then conver to string
		genre = !!genre ? genre.toString() : '';

		console.log(year);
		console.log(genre);

		// set session for year and genre
		// to be used when loading more pages at the bottom of the screen
		Session.set('selectedSearch', {year: year, genre: genre});

		// get movies with parameters
		mdb.movieDiscover(1, year, genre);

	}
});

/*****************************************************************************/
/* AdvanceSearch: Helpers */
/*****************************************************************************/
Template.AdvanceSearch.helpers({
	genre: function () {
		var genre = mdb.getGenreList()
		console.log(genre);
		return Session.get('genres');
	},
	years: function () {
		var currentDate = new Date()
		var nextYear = currentDate.getFullYear() + 1;
		var yearArray = [];

		for (var i = nextYear; i >= 1970; i--) {
			yearArray.push({year: i});
		}
		return yearArray;
	},


});

/*****************************************************************************/
/* AdvanceSearch: Lifecycle Hooks */
/*****************************************************************************/
Template.AdvanceSearch.created = function () {
};

Template.AdvanceSearch.rendered = function () {
	// clear session on load
	Session.set('selectedSearch', {year: '', genre: ''});

	// advance search css
	$('select').each(function(){
	    var $this = $(this), numberOfOptions = $(this).children('option').length;

	    $this.addClass('select-hidden');
	    $this.wrap('<div class="select"></div>');
	    $this.after('<div class="select-styled"></div>');

	    var $styledSelect = $this.next('div.select-styled');
	    $styledSelect.text($this.children('option').eq(0).text());

	    var $list = $('<ul />', {
	        'class': 'select-options'
	    }).insertAfter($styledSelect);

	    for (var i = 0; i < numberOfOptions; i++) {
	        $('<li />', {
	            text: $this.children('option').eq(i).text(),
	            rel: $this.children('option').eq(i).val()
	        }).appendTo($list);
	    }

	    var $listItems = $list.children('li');

	    $styledSelect.click(function(e) {
	        e.stopPropagation();
	        $('div.select-styled.active').each(function(){
	            $(this).removeClass('active').next('ul.select-options').hide();
	        });
	        $(this).toggleClass('active').next('ul.select-options').toggle();
	    });

	    $listItems.click(function(e) {
	        e.stopPropagation();
	        $styledSelect.text($(this).text()).removeClass('active');
	        $this.val($(this).attr('rel'));
	        $list.hide();
	        //console.log($this.val());
	    });

	    $(document).click(function() {
	        $styledSelect.removeClass('active');
	        $list.hide();
	    });

	});
};

Template.AdvanceSearch.destroyed = function () {
};