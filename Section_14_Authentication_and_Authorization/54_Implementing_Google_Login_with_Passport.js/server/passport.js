import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const clientID =
  '79180231800-u7ectk8hun9qsajnih27lvhap6djofh5.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUri = 'http://localhost:4000/auth/google/callback';

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL: redirectUri,
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    },
  ),
);
