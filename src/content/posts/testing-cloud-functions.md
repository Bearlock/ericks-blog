---
title: Testing Cloud Functions
description: Digging into how to write tests for Firebase Cloud Functions
date: 2017-09-15
draft: false
tags: ["code", "meta", "node"]
---

##### [Click me](#firebase-cloud-functions) if you wanna get right to testing

## It is now 2017

Happy belated new year.

Its been about nine months now. Change is constant and inevitable. In this year alone I have:

1. Gotten a new and exciting job,
2. Bought a beautiful dream home, and
3. Began wrapping up my last year of college

Several big and life altering changes.  Its sad to say, but writing here took a backseat to the other priorities in my life.  Heck, I can admit to not having lifted in a few months (nega-gainz are likely). But, now I'm in a stable enough place now to get back to writing. I'm exploring side projects, tech, and stuff that makes career-life fulfilling and fun.

So there; a recap and explanation for another extended absence. You're probably curious about my new job though, right?

## A little business background

I'm gainfully employed at a startup(-ish?) company that makes _your_ memories and coveted files _their_ business. At its core [Yours.co](https://www.yours.co) is a company dedicated to creating a sort of hard-copy deployment pipeline. One of our products is an archiving service. It takes your ephemeral files and writes them to a disc that gets delivered to your door (and sometimes stored in a vault). The other product is being advertised as a 'magic movie' creation service. Again, you feed your special memories to us, and we give you back a packed box with a blu-ray of magic movies at it's heart.

If this all seems like something that someone could given an afternoon, you're not wrong. The question is if this person could do this under the confines of quality, repeatability, and volume. That's where the beauty and the point of software become clear. Someone once said

> If you do it more than twice, automate it

Software is about solving hard and mundane problems. Software (usually) _is_ automation. And having to edit or save files to a disc day-in and day-out is a hard and mundane problem that should be automated.  On top of this, [Yours.co](https://www.yours.co) offers two enhancements that make their service different. One is that we burn the files to a proprietary disc technology in the way of [M-DISC](https://en.wikipedia.org/wiki/M-DISC). The other is that we use machine learning to create the magic movies.

This little bit of background should provide some context to the work I'm doing as well as help clarify my perspective. Let's move onto some code.

## Testing: an informal primer

From my (limited) experience people have certain feelings and assumptions about testing. I'll tell you two truths and a lie, and you'll try to guess the lie. Ready?

1. Testing is necessary to producing _and maintaining_ good quality software.
2. Testing will refine and hone your logic and distill the way your code communicates with others. Which will in turn make you a more effective communicator and better programmer.
3. Testing will eliminate _all_ bugs from your code, platinum-certify your software causing your stock to skyrocket, your sales to triple-double, and your prestige as a developer and engineer to be known throughout the land; Alan Turing himself will step out from the vale of 0's and 1's and the realm of perfect functions, condescend to a state where you aren't blinded and burnt by his brilliance, and share with you the secrets of P = NP

Did you guess the lie? I'll assume you did. Regardless of what some may lead you to believe, testing isn't the end all, be all to software development. Testing won't _guarantee_ good code, easy maintenance, or zero bugs. However, testing _is_ a vital and necessary tool to producing good and maintainable software. Software testing forces you to evaluate and examine your assumptions, goals, and limitations. Getting into a testing mindset immediately allows you to verify these assumptions. This in turn validates your goals, and probes your limitations, all before you even write your first test case.

Besides technical introspection, software testing lends itself to writing repeatable, reusable, and _provably correct_ software. At least, informally and pseudo-provably correct software. [This is a good Stackoverflow conversation on provably correct software](https://stackoverflow.com/questions/476959/why-cant-programs-be-proven). Repeatable, reusable, and 'correct' code is often 'good' and maintainable. But, it's important to remember that testing is a tool and needs to be applied on a case by case basis. If you're writing software for NASA or hospitals, testing rigor is paramount. If you're writing a simple CRUD app, do some good testing, but keep an eye singular to the glory of shipping your app.

Finally, I could wax lyrical about being an effective communicator. I'll try to keep it brief. **Being able to effectively communicate is the most important skill needed for success in life**. Regardless of  situation, being able to speak and be understood, and being able to listen and understand gets you 90% of the way to success. Everything else is (necessary) gravy. Thus, if software testing fosters and improves communication and thought, it will also improve you as a programmer (and person).

In summary, tests make for better logic, better software, and better people; get to testing!

Now onto some actual code.

<a name="firebase-cloud-functions">
  <h2>Firebase Cloud Functions</h2>
</a>

If you don't know what Cloud Functions are, they're analogous to AWS's Lambda Functions; both are part of the whole `serverless` movement. If you don't know what that is, think of anything serverless as `[blank]-as-a-service`. Severless databases -> databases-as-a-service, i.e Cloud/Lambda/Serverless functions -> functions-as-a-service. You write functions, deploy them to Firebase servers, and trigger them with certain events. Combine these with Firebase's storage, real-time database, auth, and hosting. You've got yourself the infrastructure for an API and frontends in less than two shakes.

### Test setup

Here is what my test setup and the test for that function look like:

```javascript
const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

const assert = chai.assert;
chai.use(chaiAsPromised);

describe('Cloud Functions', () => {
  let cloudFunctions, configStub, adminInitStub, functions, admin;

  before(() => {
    admin = require('firebase-admin');
    adminInitStub = sinon.stub(admin, 'initializeApp')

    functions = require('firebase-functions');
    configStub = sinon.stub(functions, 'config').returns ({
      firebase: {
        apiKey: 'whatakey123',
        authDomain: 'not-an-auth-domain.firebaseapp.com',
        databaseURL: 'https://not-a-project.firebaseio.com',
        projectId: 'not-a-project',
        storageBucket: 'not-a-project.appspot.com',
        messagingSendId: '123456'
      },
    });

    cloudFunctions = require('../index');
  });

  after(() => {
    configStub.restore();
    adminInitStub.restore();
  });
```

[I shamelessly got this from Firebase's docs.](https://firebase.google.com/docs/functions/unit-testing) As you can see, this sets up Chai (an assertion library), Sinon (a mocking library) and chai-as-promised (a Promise plugin for Chai). In this case Mocha is my test runner. If you've used Mocha then you know it comes with a bunch of handy functions. `describe()` let's me structure my tests and set up a suite of sorts. I've wrapped all my cloud functions in this first `describe()` block. My tests are structured in this way:

```
Cloud functions
  captureUser
    testcase1
    testcase2
    . . .
  updateUsersAndPurchases
    testcase1
    testcase2
    . . .
  updateFilesAfterUpload
    testcase1
    testcase2
    . . .
End Cloud functions
```

I can nest `describe()`s inside each other, and then use Mocha's `it()` as my test case where `it()` describes some sort of expected behavior. The `before()` block above lets me manipulate some behavior and state before the tests get run. From the code above you can see that I'm requiring `firebase-functions` and `firebase-admin` and stubbing them both out with Sinon. `adminInitStub = sinon.stub(admin, 'initializeApp')` is overriding `firebase-admin`'s `initializeApp()` function with an empty stub. Right now it does nothing.

```javascript
configStub = sinon.stub(functions, 'config').returns ({
  firebase: {
    apiKey: 'whatakey123',
    authDomain: 'not-an-auth-domain.firebaseapp.com',
    databaseURL: 'https://not-a-project.firebaseio.com',
    projectId: 'not-a-project',
    storageBucket: 'not-a-project.appspot.com',
    messagingSendId: '123456'
  },
});
```

This block is overriding `firebase-functions` `config` function with a stub _and_ I'm telling that stub what to return. I'm returning a fake Firebase config object. All of this is done because the code doesn't have access to a Firebase config when it isn't deployed to Firebase. If you recall, in the `captureUser()` code block there is a line `admin.initializeApp(functions.config().firebase);` that initializes the app with all the real Firebase config. I'm overriding that behavior for testing purposes. After those behaviors get stubbed and mocked I can safely require my index file. The `after()` block uses `restore()` on the respective stubs to restore them to their default (pre-override) behavior.

### Tests

At Yours, we decided to use Firebase for quick mobile development and iteration. I dove right into writing a few of the cloud functions and as such, I also wanted the responsibility of writing their respective tests. This is what my first function, `captureUser()` looked like:

```javascript
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.captureUser = functions.auth.user().onCreate((event) => {
  const user = event.data;

  const splitEmail = user.email.split('@');

  // If for some reason google provides us with a weird string
  // that isn't an email; Very weak check, but a check nonetheless
  if(splitEmail[1] === undefined) {
    console.log('Not an email?');
    return;
  }

  const role = splitEmail[1] === 'yours.co' ? 'admin' : 'user';

  return admin.database().ref(`users/${user.uid}`).set({
    email: user.email,
    name: user.displayName,
    role,
  });
});
```
It triggers on a Firebase auth user creation event, `functions.auth.user().onCreate((event)`. Essentially `captureUser()` gets the user's data from `event.data`, does a weak check for a real email, assigns a user or admin role (admin if its a yours.co email account), and passes an object to `set()` to save the pertinent information to the real time database in the `users` collection . Pretty simple stuff.

Wrapping my head around the tests didn't prove to be as simple. This was my first real foray into writing tests without someone looking over my shoulder and it was a little daunting. I learned that if I wanted to write tests without side-effects (writing to a database, making an api call, etc) I would have to stub out everything. AFter some intense study (thanks Google), I found out that there were three main things I had to stub out/consider:

1. The event that triggers the function
2. The data from the event (what I'm acting upon)
3. What exactly I'm returning

In this case, an `auth` event is our trigger. According to Firebase's docs an event is an object that at the very least has a `data` and `eventType`. The event objects differ in their data based on event type. I was going to be using an `auth` event object several times so I wrote a few helper functions to support that. First, `generateAuthEvent()`:

```javascript
function generateAuthEvent() {
  return {
    data: generateUserRecord(),
    eventId: '123456-fake-id-string',
    eventType: 'providers/firebase.auth/eventTypes/user.create',
    resource: 'projects/fake-project-id',
    notSupported: {},
    params: {},
    timestamp: new Date().toString()
  };
}
```

It just returns an fake/mocked object with an `auth` signature. The resulting data from an auth event is a user record:

```
function generateUserRecord() {
  return {
    uid: 'fake-uid',
    email: 'fake@test.com',
    password: 'faker',
    displayName: 'Fake fakington',
    photoURL: 'http://erickrdiaz.com/blog/images/avatar.jpg',
    disabled: false,
    emailVerified: false,
  };
}
```

This helper function also returns a fake object with a user record signature. These helper functions allowed me to mock out my first and second considerations, the triggering event and it's data. This is what my first test and test setup for `captureUser()` look like:

```javascript
describe('captureUser', () => {
    let databaseStub;

    before(() => {
      databaseStub = sinon.stub(admin, 'database');
    });

    after(() => {
      databaseStub.restore();
    })

    it('captures user info from an \'onCreate\' auth event, and stores it in the real time database', () => {
      const fakeAuthEvent = generateAuthEvent();

      const refStub = sinon.stub();
      const setStub = sinon.stub();

      databaseStub.returns({ ref: refStub });

      const refParams = `users/${fakeAuthEvent.data.uid}`;

      refStub.withArgs(refParams).returns({ set: setStub} );
      setStub.returns(Promise.resolve({ ref: 'new_ref' }));

      return assert.becomes(cloudFunctions.captureUser(fakeAuthEvent), { ref: 'new_ref' });
    });
  ```

The return for `captureUser()` is:

```
return admin.database().ref(`users/${user.uid}`).set({
  email: user.email,
  name: user.displayName,
  role,
});
```

This next part is a dense line by line-ish explanation of what exactly I'm doing in the code above.

I need to stub out the `admin` object (done in the Cloud Functions `before()` block), `database()`, `ref()`, and `set()`. As you can see above I stub them out with `databaseStub = sinon.stub(admin, 'database');`, `const refStub = sinon.stub();`, and `const setStub = sinon.stub();`. The database function is supposed to return an object with a `ref` attribute. I override the function return with `databaseStub.returns({ ref: refStub })` to make it return the empty ref stub. `refParams` mocks out the database object the event is listening to. `ref()` called with `refParams` should return an object with a `set()` function, or in other words, `refStub.withArgs(refParams).returns({ set: setStub} );` `set()` returns a promise with a `ref` property so that also needs to be mocked here `setStub.returns(Promise.resolve({ ref: 'new_ref' }));`. Finally, the mocked-out and overriden `captureUser()` function can be asserted,  `return assert.becomes(cloudFunctions.captureUser(fakeAuthEvent), { ref: 'new_ref' });`, and thanks to `chai-as-promised`, I can assert on promises with  `becomes()`.

Phew. That was a bit much, but luckily most of the tests follow a similar format. Here it is for your viewing pleasure:

```javascript
const chai = require('chai');
const sinon = require('sinon');
const chaiAsPromised = require('chai-as-promised');

const assert = chai.assert;
chai.use(chaiAsPromised);

describe('Cloud Functions', () => {
  let cloudFunctions, configStub, adminInitStub, functions, admin;

  before(() => {
    admin = require('firebase-admin');
    adminInitStub = sinon.stub(admin, 'initializeApp')

    functions = require('firebase-functions');
    configStub = sinon.stub(functions, 'config').returns ({
      firebase: {
        apiKey: 'whatakey123',
        authDomain: 'not-an-auth-domain.firebaseapp.com',
        databaseURL: 'https://not-a-project.firebaseio.com',
        projectId: 'not-a-project',
        storageBucket: 'not-a-project.appspot.com',
        messagingSendId: '123456'
      },
    });

    cloudFunctions = require('../index');
  });

  after(() => {
    configStub.restore();
    adminInitStub.restore();
  });

  describe('captureUser', () => {
    let databaseStub;

    before(() => {
      databaseStub = sinon.stub(admin, 'database');
    });

    after(() => {
      databaseStub.restore();
    })

    it('captures user info from an \'onCreate\' auth event, and stores it in the real time database', () => {
      const fakeAuthEvent = generateAuthEvent();

      const refStub = sinon.stub();
      const setStub = sinon.stub();

      databaseStub.returns({ ref: refStub });

      const refParams = `users/${fakeAuthEvent.data.uid}`;

      refStub.withArgs(refParams).returns({ set: setStub} );
      setStub.returns(Promise.resolve({ ref: 'new_ref' }));

      return assert.becomes(cloudFunctions.captureUser(fakeAuthEvent), { ref: 'new_ref' });
    });

    it('assigns a role of \'admin\' with a yours.co email address', () => {
      const fakeAuthEvent = generateAuthEvent();
      fakeAuthEvent.data.email = 'fake@yours.co';

      const refStub = sinon.stub();
      const setStub = sinon.stub();

      databaseStub.returns({ ref: refStub });

      const refParams = `users/${fakeAuthEvent.data.uid}`;
      const setParams = {
        name: fakeAuthEvent.data.displayName,
        email: fakeAuthEvent.data.email,
        role: 'admin',
      };

      refStub.withArgs(refParams).returns({ set: setStub} );
      setStub.withArgs(setParams).returns(Promise.resolve({ ref: 'new_ref' }));

      return assert.becomes(cloudFunctions.captureUser(fakeAuthEvent), { ref: 'new_ref' });
    });

    it('assigns a role of \'user\' with a non yours.co email address', () => {
      const fakeAuthEvent = generateAuthEvent();
      fakeAuthEvent.data.email = 'fake@notyours.com'

      const refStub = sinon.stub();
      const setStub = sinon.stub();

      databaseStub.returns({ ref: refStub });

      const refParams = `users/${fakeAuthEvent.data.uid}`;
      const setParams = {
        name: fakeAuthEvent.data.displayName,
        email: fakeAuthEvent.data.email,
        role: 'user',
      };

      refStub.withArgs(refParams).returns({ set: setStub} );
      setStub.withArgs(setParams).returns(Promise.resolve({ ref: 'new_ref' }));

      return assert.becomes(cloudFunctions.captureUser(fakeAuthEvent), { ref: 'new_ref' });
    });

    it('exits if a valid-ish email isn\'t provided', () => {
      const fakeAuthEvent = generateAuthEvent();
      fakeAuthEvent.data.email = 'lolwut-string';

      return assert.eventually.equal(cloudFunctions.captureUser(fakeAuthEvent), undefined);
    })
  });

  describe.skip('updateUserAndPurchases', () => {
    const fakeUser = {
      name: "fake fakington",
      email: "fake@test.com"
    };

    it('proliferates changes from the User collection to the corresponding Purchase', () => {
      const fakeUsersAndPurchaseEvent = {
        data: new functions.database.DeltaSnapShot(null, null, fakeUser, 'input', '/users/{uid}/{userKey}'),
      };
    });
  });

  describe('updateFilesAfterUpload', () => {
    let databaseStub;

    before(() => {
      databaseStub = sinon.stub(admin, 'database');
    });

    after(() => {
      databaseStub.restore();
    })

    it('writes to the \'Files\' db collection after a new upload event', () => {
      const fileName = 'fakefile.jpg';
      const fileEvent = generateFileEvent();

      const refStub = sinon.stub();
      const pushStub = sinon.stub();

      databaseStub.returns({ ref: refStub });

      const refParam = 'files/0001';
      const pushParam = {
        name: fileName,
        timestamp: fileEvent.data.metadata.timeStamp,
        fileType: fileEvent.data.contentType,
        URL: fileEvent.data.mediaLink,
      };

      refStub.withArgs(refParam).returns({ push: pushStub });
      pushStub.withArgs(pushParam).returns(Promise.resolve({ ref: 'new_ref'}));

      return assert.becomes(cloudFunctions.updateFilesAfterUpload(fileEvent), { ref: 'new_ref' });
    });

    it('exits if a file is being deleted', () => {
      const fileEvent = generateFileEvent();
      fileEvent.data.resourceState = 'not_exists'

      return assert.eventually.equal(cloudFunctions.updateFilesAfterUpload(fileEvent), undefined);
    });

    it('exits if the file being uploaded isn\'t a user\'s file', () => {
      const fileEvent = generateFileEvent();
      fileEvent.data.name = 'not/a/user/file';

      return assert.eventually.equal(cloudFunctions.updateFilesAfterUpload(fileEvent), undefined);
    });

    it('exits if file exists but is not new and is only being triggered because of a metadata change.', () => {
      const fileEvent = generateFileEvent();
      fileEvent.data.metageneration = 2;

      return assert.eventually.equal(cloudFunctions.updateFilesAfterUpload(fileEvent), undefined);
    });
  });
});

function generateFileEvent() {
  return {
    data: generateFileMeta(),
    provider: 'providers/cloud.storage/eventTypes/object.change',
    resource: 'projects/fake-project-id',
    eventType: 'object.change'
  };
};

function generateFileMeta() {
  return {
    kind: 'storage#object',
    id: 'this-is-an-id-123',
    resourceState: 'exists',
    selfLink: 'somelink',
    name: 'user/0001/fakefile.jpg',
    bucket: 'fake-bucket',
    generation: '1',
    metageneration: '1',
    contentType: 'image/jpg',
    timeCreated: '2008-09-08T22:47:31-07:00',
    updated: '2008-09-08T22:47:31-07:01',
    timeDeleted: '2008-09-08T22:47:31-07:03',
    storageClass: 'someclass',
    size: '1234',
    md5Hash: 'hashflavoredhash',
    mediaLink: 'medialink.com',
    contentEncoding: 'someEncoding',
    contentDisposition: 'somedisposition',
    contentLanguage: 'en-us',
    cacheControl: '',
    metadata: {
      custom: 'metadata',
      timeStamp: '1234',
    },
    crc32c: 'notherhash',
    componentCount: '1',
    customerEncryption: {
      encryptionAlgorithm: 'crypto',
      keySha256: 'shaencryption'
    }
  };
}

function generateUserRecord() {
  return {
    uid: 'fake-uid',
    email: 'fake@test.com',
    password: 'faker',
    displayName: 'Fake fakington',
    photoURL: 'https://lh4.googleusercontent.com/-ly98tZeA6F0/AAAAAAAAAAI/AAAAAAAAADk/G-1n2ID9bOw/photo.jpg?sz=64',
    disabled: false,
    emailVerified: false,
  };
}

function generateAuthEvent() {
  return {
    data: generateUserRecord(),
    eventId: '123456-fake-id-string',
    eventType: 'providers/firebase.auth/eventTypes/user.create',
    resource: 'projects/fake-project-id',
    notSupported: {},
    params: {},
    timestamp: new Date().toString()
  };
}
```
