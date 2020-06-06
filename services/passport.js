const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }

      const newUser = {
        // signInChannel: 'local',
        signInChannel: profile.provider,
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
      };

      const user = await new User(newUser).save();
      done(null, user);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email }).select('+password');
      if (!user) {
        return done(null, false, { message: 'No user with that email' });
      }

      try {
        //   if (await bcrypt.compare(password, user.password)) {
        if (await user.matchPassword(password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
