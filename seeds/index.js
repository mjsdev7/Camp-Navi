console.log("SEED SCRIPT STARTED");

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const campgrounds = require('../campgrounds');

mongoose.connect('mongodb://127.0.0.1:27017/camp-navi')
    .then(() => {
        console.log("DB CONNECTED");
    })
    .catch(err => {
        console.log("DB ERROR:", err);
    });

const seedDB = async () => {
    console.log("DELETING OLD DATA");
    await Campground.deleteMany({});

    for (const camp of campgrounds) {
        console.log("ADDING:", camp.name);

        const price = Math.floor(Math.random() * 20) + 10;

        await Campground.create({
            title: camp.name,
            location: camp.location,
            author: '6a4de9c7b073d86098b6c765',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum repudiandae magnam odio unde voluptate iste ipsa? Neque assumenda fugiat illum quibusdam sed eaque, quia placeat laudantium iusto iure. Laudantium, sequi.',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/tf6igb12/image/upload/v1783937394/CampNavi/shkxrqrpcwtiroejkqhm.jpg',
                    filename: 'CampNavi/shkxrqrpcwtiroejkqhm',
                },
                {
                    url: 'https://res.cloudinary.com/tf6igb12/image/upload/v1783937395/CampNavi/vu04eqak3jhsws1dbupp.png',
                    filename: 'CampNavi/vu04eqak3jhsws1dbupp',
                }
            ],
            geometry: {
                type: "Point",
                coordinates: [camp.longitude, camp.latitude]
            }
        });
    }

    console.log("SEED COMPLETE");
};

seedDB()
    .then(() => {
        mongoose.connection.close();
        console.log("DB CLOSED");
    })
    .catch(err => {
        console.log("SEED ERROR:", err);
    });