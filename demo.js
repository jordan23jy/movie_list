// Nba = new Meteor.Collection("nba");

if (Meteor.isServer) {

	Meteor.startup(function() {

		function fill(col, source, map){
			col.remove({});
			JSON.parse(Assets.getText(source)).forEach(function(it){
				col.insert(typeof map === 'function' ? map(it) : it);
			});
		}

		fill(Nba, 'nba.json', function(name){ return {name: name}; });


	});
}