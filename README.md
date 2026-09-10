# Camp-Navi

Camp-Navi is a full-stack campground listing web application that allows users to browse, create, update, and delete camping locations.

**🌐 Live Demo:** https://camp-navi.vercel.app

This project was built as a personal full-stack web development project using Node.js, Express, MongoDB, and EJS. It focuses on backend development, database design, RESTful routing, and building a complete MVC-style web application.

Camp-Navi allows users to discover, create, and manage campground listings. Users can browse real campground locations across Japan, view detailed campground pages, and contribute their own campground entries.

## Features

- Full CRUD functionality (Create, Read, Update, Delete campgrounds)
- Browse campground listings from a database
- View detailed campground pages with images, pricing, descriptions, and locations
- Create new campground entries
- Edit and delete existing campgrounds
- MongoDB database integration using Mongoose
- Server-side rendering with EJS templates
- Form handling and validation
- Error handling for routes and database operations
- Organized MVC-style application structure
- Real campground locations across Japan
- Clean user interface using Bootstrap
- Database seed script for initial campground data

## Screenshots

### Homepage

![Camp-Navi Homepage](screenshots/camp-navi-home.png)

### All Campgrounds

![Camp-Navi All Campgrounds](screenshots/camp-navi-all-campgrounds.png)

### Campground Details

![Camp-Navi Campground Details](screenshots/camp-navi-campground-details.png)

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap
- Cloudinary
- HTML
- CSS

## Project Focus

Camp-Navi uses real campground locations instead of placeholder data, creating a realistic travel application experience.

Each campground listing includes:

- Title
- Image
- Price
- Description
- Location
- Geographic coordinates

## Project Architecture

```
Camp-Navi/

├── models/
│   └── MongoDB schema definitions

├── routes/
│   └── Express route handlers

├── controllers/
│   └── Application logic

├── views/
│   └── EJS templates for server-side rendering

├── seeds/
│   ├── index.js
│   ├── images.js
│   └── descriptions.js

├── app.js
└── package.json
```

## Data Model

Each campground contains:

- Title
- Image URL
- Price
- Description
- Location
- Author
- Reviews
- Geometry coordinates

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mjsdev7/Camp-Navi.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```
DB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
```

Add your own values before running the application.

### 4. Start MongoDB locally

Make sure MongoDB is running on your machine.

### 5. Seed the database (optional)

```bash
node seeds/index.js
```

This will populate the database with campground listings.

### 6. Run the application

```bash
node app.js
```

### 7. Open the application

Visit:

```
http://localhost:3000
```

## Key Learnings

- Building RESTful routes with Express
- Working with MongoDB and Mongoose
- Creating and structuring an MVC application
- Server-side rendering with EJS
- Implementing CRUD operations
- Managing database relationships
- Creating reusable seed data
- Integrating Cloudinary image storage
- Handling application errors

## Future Improvements

- User authentication and authorization
- User image uploads with Cloudinary integration
- Search and filtering functionality
- Interactive map integration
- Reviews and ratings system
- Improved campground recommendations

## Purpose

This project demonstrates full-stack web development skills using a real-world application architecture.

Camp-Navi focuses on backend structure, database design, RESTful routing, and dynamic server-rendered frontend development.
