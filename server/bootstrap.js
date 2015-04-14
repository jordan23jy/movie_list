Meteor.startup(function () {
});

ServiceConfiguration.configurations.remove({
  service: "facebook"
});

// ServiceConfiguration.configurations.insert(
//   { service: 'facebook' },
//   {
//     $set: {
//       clientId: process.env['ACCOUNTS_FACEBOOK_ID'],
//       secret: process.env['ACCOUNTS_FACEBOOK_SECRET']
//     }
//   }
// );

// Accounts.loginServiceConfiguration.insert({
//   service: "facebook",
//   appId: "450358048472137",
//   secret: "9646d9675f24a3584d813fef2b27f8af"
// });


//moni.meteor.com
var fb = {};
fb.appId = "450442351797040";
fb.secret = "d37314852e63079d6beee877550e04db";
fb.appIdLocal = "450358048472137";
fb.secretLocal = "9646d9675f24a3584d813fef2b27f8af";

ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
        $set: {
            appId: fb.appIdLocal,
            secret: fb.secretLocal
        }
    }
);