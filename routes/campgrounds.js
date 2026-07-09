const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utilities/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const Campground = require('../models/campground');

// INDEX
router.get('/', catchAsync(campgrounds.index));

// NEW
router.get('/new', isLoggedIn, campgrounds.renderNewForm);

// CREATE
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

// SHOW
router.get('/:id', catchAsync(campgrounds.showCampground));

// EDIT
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

// UPDATE
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampgrounds));

// DELETE
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;