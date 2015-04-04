Package.describe({
	name: 'moviedb',
	summary: "MovieDB package",
	version: '1.0.0'
});

Package.onUse(function (api) {
	api.versionsFrom('0.9.4');
	api.addFiles('moviedb.js');
	api.export('MovieDB');
})