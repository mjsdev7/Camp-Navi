const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressErrors');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://127.0.0.1:27017/camp-navi')
    .then(() => console.log('Database connected'))
    .catch(err => console.log('connection error:', err));

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// session + flash MUST be before routes
app.use(session({
    secret: 'campnavi secret',
    resave: false,
    saveUninitialized: false
}));

app.use(flash());

// flash locals
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// routes
app.use('/campgrounds', campgrounds);
app.use('/campgrounds', reviews);

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});