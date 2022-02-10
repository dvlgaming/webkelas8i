const express = require('express'),
const axios = require("axios")
const cheerio = require("cheerio")
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const schedule = require('node-schedule');
const MemoryStore = require('memorystore')(session);
const rateLimit = require("express-rate-limit");

cors = require('cors'),
secure = require('ssl-express-www');
const PORT = process.env.PORT || 8080 || 5000 || 3000
const { color } = require('./lib/color.js')
const userRouters = require('./routes/users');
const { isAuthenticated } = require('./lib/auth');
const { connectMongoDb } = require('./database/connect');
const { getApikey, resetLimit } = require('./database/db');
const { port } = require('./lib/settings');
const { ignoreFavicon } = require('./lib/function');
var mainrouter = require('./routes/main')

const PORT = process.env.PORT || port;

connectMongoDb();

app.set('trust proxy', 1);

app.set('view engine', 'html');
app.use(express.static('public'));

app.use(ignoreFavicon)

app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./lib/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})

app.use(function(req, res, next) {
  getTotalUser()
  addRequest();
  next();
})

app.use('/', mainrouter)
app.get('/docs', isAuthenticated, async (req, res) => { 
  addVisitor()
  let { username } = req.user
  res.render('docs', {
    username: username,
  });
});
app.get('/profile', isAuthenticated, async (req, res) => { 
  addVisitor()
  let { username } = req.user
  res.render('profile', {
    username: username,
  });
});
app.use('/users', userRouters);

app.listen(PORT, () => {
    console.log(color("Server running on port " + PORT,'green'))
})

module.exports = app