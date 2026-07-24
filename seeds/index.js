require('dotenv').config();

console.log("SEED SCRIPT STARTED");

const images = require('./images');
const descriptions = require('./descriptions');
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const campgrounds = require('../campgrounds');

const seedDB = async () => {
    console.log("DELETING OLD DATA");
    await Campground.deleteMany({});

    for (const camp of campgrounds) {
        console.log("ADDING:", camp.name);
        console.log("DESCRIPTION:", descriptions[camp.name]);

        const price = (Math.floor(Math.random() * 8) + 3) * 500;

        await Campground.create({
            title: camp.name,
            location: camp.location,
            author: '6a5884e70a35b8d5f383eabb',
            description: descriptions[camp.name],
            price,
            images: [
                images[camp.name]
            ],
            geometry: {
                type: "Point",
                coordinates: [camp.longitude, camp.latitude]
            }
        });
    }

    console.log("SEED COMPLETE");
};

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("DB CONNECTED");
        return seedDB();
    })
    .then(() => {
        mongoose.connection.close();
        console.log("DB CLOSED");
    })
    .catch(err => {
        console.log("SEED ERROR:", err);
    });