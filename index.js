const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
require('colors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect database
connectDB();

// Route files
const auth = require('./routes/auth');

require('./models/User');
require('./services/passport');

const app = express();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Mount routers
require('./routes/authRoutes')(app);
app.use('/api/v1/auth', auth);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
