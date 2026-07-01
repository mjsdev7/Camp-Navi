const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string()
            .uri()
            .required()
            .messages({
                'string.empty': 'Image URL is required',
                'string.uri': 'Please enter a valid image URL (must start with http:// or https://)',
                'any.required': 'Image is required'
            }),
        location: Joi.string().required(),
        description: Joi.string().required(),

    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})

