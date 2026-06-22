# Camp-Navi

Camp-Navi is a full-stack web application for discovering, creating, and managing campground listings. It allows users to browse real camping locations, view detailed information, and contribute their own campgrounds. The project is built with Node.js, Express, MongoDB, and EJS using server-side rendering.

## Features

- Browse campground listings from a database
- View detailed campground pages with image, price, and location
- Create new campground entries
- Edit and delete existing campgrounds
- Persistent data storage with MongoDB
- Server-rendered UI using EJS templates
- Seed script to populate database with initial data

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- Bootstrap
- HTML / CSS

## Project Architecture

- **app.js**: Main application entry point and routing
- **models/**: MongoDB schema definitions (Mongoose)
- **views/**: EJS templates for frontend rendering
- **seeds/**: Database seed script for sample data

## Data Model

Each campground includes:

- Title
- Image URL
- Price
- Description
- Location

## Setup Instructions

1. Clone the repository
   git clone https://github.com/mjsdev7/Camp-Navi.git

2. Install dependencies
   npm install

3. Start MongoDB locally

4. Seed the database (optional)
   node seeds/index.js

5. Run the application
   node app.js

6. Open in browser
   http://localhost:3000

## Key Learnings

- Building RESTful routing with Express
- Working with MongoDB and Mongoose
- Structuring a full-stack MVC application
- Server-side rendering with EJS
- CRUD operations with persistent storage

## Future Improvements

- User authentication and authorization
- Image upload system instead of static URLs
- Search and filtering functionality
- Map integration for campground locations
- Reviews and ratings system

## Purpose

This project demonstrates full-stack development skills using a real-world architecture pattern. It focuses on backend structure, database design, and dynamic server-rendered frontend development.
