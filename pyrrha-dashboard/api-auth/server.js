const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bearerToken = require('express-bearer-token');

const helmet = require('helmet');

const routes = require('./rest/routes');
const passportClient = require('./services/passport');

const PORT = process.env.PORT || 4000;

const app = express();

app.use(helmet());

app.use(bearerToken());

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

let secret = null;
// If running on Cloud Foundry, set secret to env var
if (process.env.VCAP_APPLICATION) {
  secret = process.env.SESSION_SECRET;
} else {
  // In dev, try to get secret from vcap-local.json or use default
  try {
    const fs = require('fs');
    if (fs.existsSync('./vcap-local.json')) {
      const vcapConfig = require('./vcap-local.json');
      secret =
        vcapConfig.user_vars?.session_secret ||
        'dev-session-secret-change-in-production';
    } else {
      secret = 'dev-session-secret-change-in-production';
      console.warn(
        '⚠️  Using default session secret for development. Set up vcap-local.json for production.',
      );
    }
  } catch (_error) {
    secret = 'dev-session-secret-change-in-production';
    console.warn(
      '⚠️  Could not load vcap-local.json, using default session secret.',
    );
  }
}

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passportClient.initPassport());
app.use(passportClient.initSession());
passportClient.connectStrategy();

let allowedOrigin = null;
if (process.env.VCAP_APPLICATION) {
  allowedOrigin = 'https://pyrrha-dashboard.mybluemix.net';
} else {
  allowedOrigin = 'http://localhost:3000';
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// USE_STATIC env var added by docker
if (process.env.USE_STATIC) {
  app.use(express.static(path.join(__dirname, './build')));

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
  });
}

routes(app);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
