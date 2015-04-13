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

ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
        $set: {
            appId: process.env['ACCOUNTS_FACEBOOK_ID'],
            secret: process.env['ACCOUNTS_FACEBOOK_SECRET']
        }
    }
);