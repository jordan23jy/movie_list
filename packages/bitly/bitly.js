Bitly = {};

Bitly.shortenURL = function (url) {

	var BITLY_TOKEN = process.env.BITLY_TOKEN;

	if(!BITLY_TOKEN)
		throw new Meteor.Error(500, 'Please provide a Bitly token in Meteor.settings');

	var shortenResponse = Meteor.http.get(
		"https://api-ssl.bitly.com/v3/shorten?",
		{
			timeout: 5000,
			params: {
				"format": "json",
				"access_token": BITLY_TOKEN,
				"longUrl": url
			}
		}
	);

	if (shortenResponse.statusCode !== 200) {
		throw new Meteor.Error(shortenResponse.data.status_code, "Bitly call failed with error: " + shortenResponse.data.status_txt);
	} else {
		return shortenResponse.data.data.url
	}
}

Bitly.getClicks = function (link) {

	var BITLY_TOKEN = process.env.BITLY_TOKEN;

	if (!BITLY_TOKEN)
		throw new Meteor.Error(500, 'Please provide Bitly token in Meteor.settings')

	var statusReponse = Meteor.http.get(
		"https://api-ssl.bitly.com/v3/link/clicks?",
		{
			timeout: 5000,
			params: {
				"format": "json",
				"access_token": BITLY_TOKEN,
				"link": link
			}
		}
	);

	if (statusReponse.data.status_code === 200) {
		return statusReponse.data.data.link_clicks
	}
}

Meteor.methods({
	'getBitlyClicks': function (link) {
		return Bitly.getClicks(link);
	}
});

// Meteor.call('getBitlyClicks', "http://bit.ly/1GSKbiv", function(error, result){console.log(result)})


// GET request called every 10 seconds to refresh data from API
var callInterval = 10000;
Meteor.setInterval(function () {

	// get all posts with the shortUrl property
	var shortUrlPosts = Posts.find({shortUrl: {$exists: true}});
	var postsNumber = shortUrlPosts.count();

	//initialize counter
	var count = 0;

	shortUrlPosts.forEach(function (post) {
		var clicks = Bitly.getClicks(post.shortUrl);
		//calculate the right delay to distribute API calls evenly throughout the interval
		var callTimeout = Math.round(callInterval / postsNumber * count)

		Meteor.setTimeout(function () {
			// store clicks as property of post document
			Posts.update(post._id, {$set: {clicks: clicks}})
		}, callTimeout);

		count++;

	});
}, callInterval);