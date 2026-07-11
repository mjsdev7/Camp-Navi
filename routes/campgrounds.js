const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const Campground = require('../models/campground');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    // INDEX
    .get(catchAsync(campgrounds.index))
    //CREATE
    // .post(isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));
    .post(upload.array('image'), (req, res) => {
        res.send(req.body, req.files)
    })

// NEW
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    // SHOW
    .get(catchAsync(campgrounds.showCampground))
    // UPDATE
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampgrounds))
    // DELETE
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// EDIT
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;