const passport = require('passport');
const fs = require('fs');
const path = require('path');

let appStrategy = null;
let hasAppIdConfig = false;

try {
  if (process.env.VCAP_APPLICATION) {
    const appId = require('ibmcloud-appid');
    const { WebAppStrategy } = appId;
    appStrategy = new WebAppStrategy();
    hasAppIdConfig = true;
  } else {
    // Check if vcap-local.json exists and has valid config
    const vcapPath = path.join(__dirname, '../vcap-local.json');
    if (fs.existsSync(vcapPath)) {
      const vcapConfig = require('../vcap-local.json');
      const credentials = vcapConfig.services?.AppID?.credentials;

      if (
        credentials &&
        credentials.clientId &&
        credentials.tenantId &&
        credentials.secret
      ) {
        const appId = require('ibmcloud-appid');
        const { WebAppStrategy } = appId;
        const devConfig = { ...credentials };
        devConfig.redirectUri =
          'http://localhost:3000/ibm/cloud/appid/callback';
        appStrategy = new WebAppStrategy(devConfig);
        hasAppIdConfig = true;
      } else {
        console.warn(
          '⚠️  IBM App ID credentials incomplete in vcap-local.json - running in development mode without authentication',
        );
      }
    } else {
      console.warn(
        '⚠️  vcap-local.json not found - running in development mode without authentication',
      );
    }
  }
} catch (error) {
  console.warn('⚠️  Failed to initialize IBM App ID:', error.message);
  console.warn('⚠️  Running in development mode without authentication');
  hasAppIdConfig = false;
}

class PassportService {
  constructor() {
    this.passport = passport;
    this.hasAppIdConfig = hasAppIdConfig;
  }

  initPassport() {
    return this.passport.initialize();
  }

  initSession() {
    return this.passport.session();
  }

  connectStrategy() {
    if (this.hasAppIdConfig && appStrategy) {
      this.passport.use(appStrategy);
      this.passport.serializeUser((user, done) => done(null, user));
      this.passport.deserializeUser((obj, cb) => cb(null, obj));
    } else {
      // Development mode - use mock authentication
      this.passport.serializeUser((user, done) =>
        done(null, user || { id: 'dev-user', name: 'Development User' }),
      );
      this.passport.deserializeUser((obj, cb) => cb(null, obj));
    }
  }

  authenticate(cb) {
    if (this.hasAppIdConfig && appStrategy) {
      const appId = require('ibmcloud-appid');
      const { WebAppStrategy } = appId;
      return this.passport.authenticate(WebAppStrategy.STRATEGY_NAME, cb);
    } else {
      // Development mode - mock authentication middleware
      return (req, res, next) => {
        req.user = req.user || {
          id: 'dev-user',
          name: 'Development User',
          email: 'dev@pyrrha.local',
        };
        next();
      };
    }
  }
}

const passportClient = new PassportService();

module.exports = passportClient;
