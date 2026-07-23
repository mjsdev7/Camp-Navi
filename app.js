if (process.env.NODE_ENV !== "production") {
    require('dotenv').config({ quiet: true });
}

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressErrors');
const methodOverride = require('method-override');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];

const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.maptiler.com/",
];

const connectSrcUrls = [
    "https://api.maptiler.com/",
    "https://cdn.maptiler.com/",
    "https://cdn.jsdelivr.net/",
];

const fontSrcUrls = [];


// DB
const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl)
    .then(() => console.log('Database connected'))
    .catch(err => console.log('connection error:', err));


const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});


const app = express();


app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: [
                "'self'",
                ...connectSrcUrls,
            ],
            scriptSrc: [
                "'unsafe-inline'",
                "'self'",
                ...scriptSrcUrls,
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'",
                ...styleSrcUrls,
            ],
            workerSrc: [
                "'self'",
                "blob:",
            ],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "data:",
                "blob:",
                "https://api.maptiler.com/",
                "https://res.cloudinary.com/tf6igb12/",
                "http://images.unsplash.com/",
            ],
            fontSrc: [
                "'self'",
                ...fontSrcUrls,
            ],
        },
    })
);


// view engine setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// favicon fix
app.get('/favicon.ico', (req, res) => res.status(204).end());


// session config
const sessionConfig = {
    store,
    name: 'session',
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};


app.use(session(sessionConfig));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


// routes
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);


// home route
app.get('/', (req, res) => {
    res.render('home');
});


// 404 handler
app.all(/.*/, (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});


// error handler
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });
});


// server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});