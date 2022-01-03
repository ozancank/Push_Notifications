const webPush = require("web-push");
const vapidKeys = {
  publicKey: "X",
  privateKey: "X",
};

webPush.setVapidDetails(
  "mailto:info@test.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

//console.log(vapidKeys);

const subscriberChrome = {
  endpoint: "X",
  expirationTime: null,
  keys: {
    p256dh: "X",
    auth: "X",
  },
};

const subscriberFireFox = {
  endpoint: "X",
  keys: {
    auth: "X",
    p256dh: "X",
  },
};

webPush.sendNotification(subscriberChrome, "Push Notification yapıldı.");
webPush.sendNotification(subscriberFireFox, "Push Notification yapıldı.");
