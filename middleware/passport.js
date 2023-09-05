const passport = require("passport");
const { Strategy } = require("passport-google-oauth2");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BASE_URL_ONRENDER,
  // BASE_URL_LOCAL,
} = process.env;

// params obj
const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL_ONRENDER}/auth/google/callback`,
  // callbackURL: `${BASE_URL_LOCAL}/auth/google/callback`,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    // google returns info about user (name and email)
    const { email, displayName } = profile;

    // if user with this email (gmail) is already in DB - we isue token for this user (he wants to log in)
    // othrwise - user has to register
    const user = await User.findOne({ email });

    // if user with such email (gmail) is in DB
    if (user) {
      return done(null, user); // we 'write' this user in req.user (req.user = user)
    }

    // if user with such email/gmail is not in DB - we register him and add to DB using his gmail
    // creating password for user (user will not use it)
    const hashedPassword = await bcrypt.hash(uuid.v4(), 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: displayName,
    });

      // in case user registers via google/gmail, he also logs in via gmail (we pass control further)
      done(null, newUser);
  } catch (error) {
      done(error, false);
  }
};

// google-strategy (passport follows it)
const googleStrategy = new Strategy(googleParams, googleCallback);

// adding strategy to passport (in case authorization is via google - follow this strategy)
passport.use("google", googleStrategy);

module.exports = passport;
