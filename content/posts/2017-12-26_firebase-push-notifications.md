---
title: "Firebase Push Notifications"
date: 2017-12-26T12:35:31-07:00
slug: "firebase-push-notifications"
type: post
---

## Principles and Patterns

(I wax lyrically a bit about software design; if you just want the code click [here](#pusher))

My _Principles and Patterns of Software Design_ class (what a mouthful) was one of the most important classes I took during my time at UVU. Most of the subject matter was based off of a modified set of [GoF patterns](gangoffour). Whether you love or hate the patterns, you have to admit that they were and continue to be an influencing force in the software development world. I'm no expert at software and architecture design, but my skill has improved over the years. Exposure to the principles and patterns in that class has been a catalyst to a continually changing (and hopefully improving) code style.

One of the biggest take-aways from that class was the following principle:

> Program to an interface, not an implementation

From the recent googling I did, it feels like people struggle to understand what this means. Often Java or C# specific semantics are involved in the definition, or other overly technical, language specific definitions and examples are given. This is all well and great and probably reveals some information about the specific language itself, but the concept of **program to an interface, not an implementation** is lost.

## Interface versus Implementation

I think it's important to breakdown a principle or definition into more easily digestible parts; usually a lot of meaning can be packed into a few words. So then, what exactly is an interface, and what exactly is an implementation?

### Interface

According to [wikipedia](interface),

> In computing, an interface is a shared boundary across which two or more separate components of a computer system exchange information. The exchange can be between software, computer hardware, peripheral devices, humans and combinations of these. Some computer hardware devices, such as a touchscreen, can both send and receive data through the interface, while others such as a mouse or microphone may only provide an interface to send data to a given system.

Quite a bit of information packed into one word. Words that stand out in the definition are **shared boundary**, and **exchange information**. Interfaces are shared boundaries comprised of interaction (information exchange). There are some metaphors that come to mind when dealing with boundaries of exchange (cell membranes, mechanical gears, etc.). Metaphors are important because they can help distill a little meaning by providing concrete examples; interfaces by their nature are an _abstraction_.

### Implementation

The definition for _implementation_ might be even harder to grok ([wiki link](implementation)):

> In computer science, an implementation is a realization of a technical specification or algorithm as a program, software component, or other computer system through computer programming and deployment. Many implementations may exist for a given specification or standard. For example, web browsers contain implementations of World Wide Web Consortium-recommended specifications, and software development tools contain implementations of programming languages.

**An implementation is a realization**. In other words, it's a specification made solid; the fulfillment of an idea. An implementation would be the house that gets built from blueprints, or the song played from sheet music. An implementation is the end result of taking something abstract, and through some process, making it concrete.

## Why is this important?

Programming to an interface as opposed to an implementation was the driving principle behind my push notification class. It's true that creating this class may have taken some more upfront time and work. Heck, so far I only use the class in one or two places. I could have easily just avoided writing the class altogether and instead used the built-in Firebase functions to do so. I'll illustrate what that would look like, but first some context is probably nice.

### Context

I have a Shipengine webhook that listens for and processes changes in a customer's shipping status. Shipengine will `POST` their information to my endpoint and my endpoint will do stuff with it. Right now it updates a "purchase" in my realtime database and then sends a push notification to the customer about the status of their purchase.

```javascript
const STATUS_CODES = {
  AC: "shippingAccepted",
  IT: "shippingInTransit",
  DE: "shippingDelivered",
  EX: "shippingError",
  UN: "shippingError"
};

function trackingShipment(req, res) {
  const { resource_type } = req.body;
  const { status_code, tracking_number } = req.body.data;

  if (resource_type == "track" && _.has(STATUS_CODES, status_code)) {
    let purchaseData;
    db
      .getPurchaseFromTrackingNumber(tracking_number)
      .then(purchase => {
        purchaseData = purchase.data;
        return updateStatus(purchase.id, STATUS_CODES[status_code]);
      })
      .then(() => {
        // Push notification stuff would happen here
      })
      .then(() => res.sendStatus(200))
      .catch(handleHttpError);
  } else {
    res.sendStatus(200);
  }
}
```

If I just wanted to do a quick and dirty static status update push notification, I could do something like the following in the `.then()` body. Note that `db` both in the above and below code is another interface class in our codebase.

```javascript
let token;
db
.getUser(userId)
.then(user => {
  token = user.fcm_token;
})

admin.messaging().sendToDevice(token, {
  title: "Your shipping status updated!",
  body: "I'm not sure what, but something has happened to your purchase!"
});
```

### Issues

Nothing super special or super complicated about the code above, but there are some issues with it.

1. The push notification is static. The same message is sent each time, regardless of the state of the shipment. This is easily remedied by checking the shipment state and making the message dependent on it, but now I'm starting to have multiple concerns in what was a simple webhook.

2. This is fine for a one-off type deal, but what happens if I wanna mimic this functionality elsewhere? I'd have to copy and paste this code in multiple spots and tweak it to fit a particular use case.

3. What happens if Firebase decides to change the function signature for sending push notifications? Updating it once is fine, but if I used it in more than one place it definitely starts to be painful.

4. In that same vein, what if for some reason my company decides to move away from Firebase? I would have to update my push notification code _everywhere_.

I'm lazy (like most programmers). If my code isn't reusable or if I have to repeat myself there's a problem and I'll probably run into some frustration, work, and heartbreak down the road. In this example, `admin.messaging(). . . ` is Firebase's implementation of a push notification service. My `Pusher` class is an interface to that service and wraps some of the functionality with my own functions. This helps mitigate the issues above.

## Pusher

Here is my push notification class in all it's glory:

```javascript
const _ = require("lodash");

class Pusher {
  constructor(messenger, db) {
    this.db = db;
    this.messenger = messenger;
    this.shippingStates = {
      shippingAccepted: {
        title: "Package Processing!",
        body:
          "Your package has been received by our carrier and is being processed!"
      },
      shippingInTransit: {
        title: "Package In transit!",
        body: "Nice! Your package is on its way!"
      },
      shippingDelivered: {
        title: "Package Delivered!",
        body: "Your package has been delivered!"
      }
    };
  }

  sendShippingNotification(userId, state) {
    return this.getToken(userId)
      .then(token => {
        if (_.has(this.shippingStates, state)) {
          this.messenger.sendToDevice(token, this.getPayload(state));
        }
      })
      .then(() => console.log("Successfully sent message!"))
      .catch(err => console.error("Error sending message:  ", err));
  }

  getToken(userId) {
    return this.db
      .getUser(userId)
      .then(user => {
        return user.fcm_token;
      })
      .catch(err =>
        console.error("Something happened when fetching user", err)
      );
  }

  getPayload(state) {
    const { title, body } = this.shippingStates[state];
    return {
      notification: {
        title,
        body
      }
    };
  }
}

module.exports = {
  Pusher
};
```

It's about 58 lines of code, where the quick-and-dirty-code was only about 11 lines. There's a significant increase in amount of code, but also a corresponding increase in quality, (re)usability, and functionality/adaptability.

### Breakdown

This is a breakdown of the `Pusher` class from least to most complex function.

**Constructor:** From the constructor it's apparent that the class depends on a database and push notification service (Firebase's `admin.database()` and `admin.messaging()` in this case). These elements come into play a little further down the code, but basically the `Pusher` class does its own database lookups and has some wrapper functions for the push notification service. `Pusher` also has an object composed of objects in the way of its `shippingStates` constant.

**getPayload()**: this function takes a Shipengine state as a parameter. `getPayload()` will get the state object in `shippingStates` that matches, and return a notification object composed of the matched `shippingState`'s title and body.

**getToken()**: this function takes a user ID as a parameter. It uses the `Db` interface class to retrieve a user object from the database and return its `fcm_token` property (or an error). An FCM token is necessary to send a push notification through Firebase.

**sendShippingNotification()**: this function takes a user ID and a state; it is mostly a wrapper function for Firebase's `admin.messaging().sendToDevice()` function. It uses the user ID to call `getToken()` and retrieve the FCM token. It then uses Lodash's `.has()` function to see if the passed in state matches any of the state objects in `shippingStates`; if it does, it will call `.sendToDevice()` and send a state-dependent notification object

## Why is this important (pt. deux)

I want to address the [issues above](#issues), but first I want to show how `Pusher` gets used inside the Shipengine webhook. Remember that empty `.then()` in the promise chain above? Here's what it actually looks like:

```javascript
.then(() => {
  return pusher.sendShippingNotification(
    purchaseData.user.id,
    STATUS_CODES[status_code]
  );
})
```

It's... pretty inconsequential and underwhelming from the look of it; boring even. **This is a good thing**. The `Pusher` interface abstracts away so much complexity and implementation details; it allows any dev to read it and understand it almost semantically. This is another benefit and side effect of programming to an interface; better legibility and maintainability! The nice thing is if someone need to better understand this at a lower level, they can just take a look at the code for the `Pusher` class. Programming to an interface benefits those who could care less about low level details (because it gets  'em out of their way), and those who need the check out the internals (because they're nicely encapsulated by a class).

And to address the issues point by point above:

1. The push notification is no longer static; it changes according to the state that is sent from Shipengine, _and_ I'm not littering the endpoint with unnecessary code since I'm separating out my concerns.

2. If I want to use this functionality elsewhere, all I have to do is import the module.

3. If Firebase decides to make some breaking changes and switch up the function signature on me, all I have to do is update the function in one place.

4. If my company moves away from Firebase, I just have to update the implementation details I'm wrapping in the `Pusher` class.

I'm going to re-iterate this principle because it's been a saving grace and guiding star for me:

>Program to an interface, not an implementation


[gangoffour]: https://en.wikipedia.org/wiki/Design_Patterns
[interface]: https://en.wikipedia.org/wiki/Interface_(computing)
[implementation]: https://en.wikipedia.org/wiki/Implementation
