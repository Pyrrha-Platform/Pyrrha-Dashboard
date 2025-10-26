const jwt = require('jsonwebtoken');
const fs = require('fs');

let secret;

if (process.env.VCAP_APPLICATION) {
  secret = process.env.JWT_SECRET;
} else {
  // Try to get secret from vcap-local.json or use default for development
  try {
    if (fs.existsSync('../vcap-local.json')) {
      const vcapConfig = require('../vcap-local.json');
      secret = vcapConfig.user_vars?.jwt_secret;
    }
  } catch (error) {
    console.warn('⚠️  Could not load vcap-local.json for JWT secret');
  }

  // Use development default if no secret found
  if (!secret) {
    secret =
      'dev-jwt-secret-change-in-production-' + Math.random().toString(36);
    console.warn(
      '⚠️  Using generated JWT secret for development. Set up vcap-local.json for production.',
    );
  }
}

const encode = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { algorithm: 'HS256' }, (err, token) => {
      if (err) return reject(err);

      return resolve(token);
    });
  });

const decode = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) return reject(error);

      return resolve(decoded);
    });
  });

module.exports = {
  encode,
  decode,
};
