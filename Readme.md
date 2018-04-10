Ratedetect is a lightweight middleware that detects and prevents malicious requests to your web app. To use ratedetect import rate detect in your file. Then on whichever route you'd like to monitor simply Ratedetect.detect to your route(s) middleware. Ratedetect takes in 5 arguments: req, res, next, params and a custom callback. Params are an object


# Rate Detect

Rate Detect is a lightweight middleware that detects and prevents malicious requests to your web app.


### Prerequisites

To begin, rate detect uses redis as a dependency. Make sure you have downloaded, installed, and running redis in your environment.

```
brew install redis
```
Once installed run the following command:

```
redis-server
```

### Installing

Now that rate detect's dependency has been installed download and install the rate detect npm package to your local project.

```
npm install ratedetect --save
```

This will install Rate Detect to your local project's modules


### Usage

To use Rate Detect import at the top of your routes file:

```
var Ratedetect = require('ratedetect');
```

Then on whichever route you'd like to monitor simply Ratedetect.detect to your route(s) middleware. Ratedetect takes in 4 arguments: req, res, next, and params.

```
app.post('/api/v1/users/login', upload.array(), (req, res, next) => Ratedetect.detect(req, res, next, { message: "Sorry too many attempts", max: 5, lockout: 6 * 60000 }), login.index);
```
Params is an object that takes in 3 parameters: 1). A custom message for when a threshold is reached. 2). The threshold at which to throw the error. 3). The lockout period in which the user must wait until requested the route again.
