const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const { campgroundSchema } = require('../schemas.js');
const { isLoggedIn } = require('../middleware');

const ExpressError = require('../utilities/ExpressErrors');
const Campground = require('../models/campground');


// VALIDATION MIDDLEWARE
const validateCampground = (req, res, next) => {
    console.log("🔥 VALIDATION RUNNING");

    const { error } = campgroundSchema.validate(req.body);

    if (error) {
        console.log("❌ VALIDATION FAILED:", error.message);
        req.flash('error', error.message);
        return res.redirect('/campgrounds/new');
    }

    next();
};


// INDEX
router.get('/', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
}));


// NEW FORM
router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
});


// CREATE
router.post(
    '/',
    validateCampground,
    catchAsync(async (req, res) => {
        const campground = new Campground(req.body.campground);
        await campground.save();

        req.flash('success', 'Successfully made a new campground!');
        res.redirect(`/campgrounds/${campground._id}`);
    })
);


// SHOW
router.get('/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');

    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/show', { campground });
}));


// EDIT
router.get('/:id/edit', catchAsync(async (req, res) => {
    console.log("REQ PARAM ID:", req.params.id);

    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }

    res.render('campgrounds/edit', { campground });
}));


// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const campground = await Campground.findByIdAndUpdate(
            req.params.id,
            { ...req.body.campground },
            {
                runValidators: true,
                new: true
            }
        );

        if (!campground) {
            req.flash('error', 'Campground not found!');
            return res.redirect('/campgrounds');
        }

        req.flash('success', 'Successfully updated campground!');
        return res.redirect(`/campgrounds/${campground._id}`);

    } catch (e) {
        req.flash('error', e.message);
        return res.redirect(`/campgrounds/${req.params.id}/edit`);
    }
});


// DELETE
router.delete('/:id', catchAsync(async (req, res) => {
    const { id } = req.params;

    await Campground.findByIdAndDelete(id);

    req.flash('success', 'Successfully deleted campground!');
    res.redirect('/campgrounds');
}));


module.exports = router;