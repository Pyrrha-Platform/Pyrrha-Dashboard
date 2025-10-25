const validator = require('email-validator');
const qs = require('qs');

const passportService = require('../services/passport.js');
const AppIdManagement = require('../services/appId');
const jwt = require('../services/jwt');

const dashboardURL = process.env.VCAP_APPLICATION
  ? process.env.ALLOWED_ORIGIN_URLS.split(',')[0]
  : 'http://localhost:3000';

if (!dashboardURL) throw new Error('No allowed origin found.');

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send('Unauthorized');
};

const apiKeyAuth = (req, res, next) => {
  let apiKey;

  if (process.env.VCAP_APPLICATION) {
    apiKey = process.env.PYRRHA_API_KEY;
  } else {
    // Try to get API key from vcap-local.json or use development default
    try {
      const fs = require('fs');
      if (fs.existsSync('../vcap-local.json')) {
        const vcapConfig = require('../vcap-local.json');
        apiKey = vcapConfig.user_vars?.pyrrha_api_key;
      }
    } catch (error) {
      console.warn('⚠️  Could not load vcap-local.json for API key');
    }

    // Use development default if no API key found
    if (!apiKey) {
      apiKey = 'dev-api-key-' + Math.random().toString(36);
      console.warn(
        '⚠️  Using generated API key for development. Set up vcap-local.json for production.',
      );
    }
  }

  if (!req.token || req.token !== apiKey) {
    return res.status(401).send('API key not found or invalid');
  }

  next();
};

module.exports = (app) => {
  /**
   * POST /verification
   * Calls AppID management API and verifies if email belongs to existing user
   * @param {email} The user's email
   * @returns {Object} User information and new account link (if new user)
   */
  app.post('/api-auth/v1/verification', apiKeyAuth, async (req, res) => {
    const { email } = req.body;
    let results;

    if (!email || !validator.validate(email)) {
      return res.status(422).send('Email is missing or invalid');
    }

    try {
      results = await AppIdManagement.verifyUserByEmail(email);

      // If no user, create user
      if (results.totalResults === 0) {
        const user = await AppIdManagement.createUser(email);

        const token = await jwt.encode({ id: user.id });

        const link = `${dashboardURL}/onboard?${qs.stringify({
          token,
        })}`;

        return res.json({
          verified: false,
          firstName: null,
          lastName: null,
          email,
          userId: user.id,
          link,
        });
      }

      return res.json({
        verified: true,
        firstName: results.Resources[0].name
          ? results.Resources[0].name.givenName
          : null,
        lastName: results.Resources[0].name
          ? results.Resources[0].name.familyName
          : null,
        userId: results.Resources[0].id,
        email,
        link: null,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(503)
        .send('There was an error verifying or creating a user.');
    }
  });

  /**
   * POST /login
   * Logins in a user, creates express session
   * @param {string} email
   * @param {string} password
   * @returns {Object} User information
   */
  app.post('/api-auth/v1/login', (req, res, next) => {
    passportService.authenticate((err, user, info) => {
      if (err || info) {
        return res.status(info.statusCode).json({
          errorCode: info.code,
        });
      }

      req.logIn(user, (e) => {
        if (e) {
          return res.status(500).json({
            errorCode: 'login_error',
          });
        }

        return res.json({
          success: true,
          email: req.user.email,
          firstName: req.user.given_name,
          lastName: req.user.family_name,
        });
      });
    })(req, res, next);
  });

  app.post('/api-auth/v1/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          errorCode: 'logout_error',
        });
      }

      res.clearCookie('connect.sid');
      res.send(true);
    });
  });

  app.post('/api-auth/v1/user', (req, res) => {
    res.send('Success');
  });

  app.get('/api-auth/v1/user', isAuth, (req, res) => {
    const user = {};

    if (req.user) {
      user.username = req.user.username;
      user.email = req.user.email;
      user.firstName = req.user.given_name;
      user.lastName = req.user.family_name;
    }

    res.json({ ...user, success: true });
  });
};
