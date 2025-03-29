# Farm Registration API

This is a Node.js API for registering farms, it uses PostgreSQL as the database and is built with Express.js

## Installation

1. Clone the repository
2. Run `docker-compose up --build` to start the containers

## API Endpoints

### GET /farms

Returns a list of all farms in the database

### GET /farms/:id

Returns a single farm by ID

### POST /farms

Creates a new farm

### PUT /farms/:id

Updates a single farm by ID

### DELETE /farms/:id

Deletes a single farm by ID

### GET /farms/sum

Returns the total area of all farms in the database

### GET /farms/count

Returns the total of farms in the database

### GET /farms/sumPlantedCropsByState

Return the sum of planted crops by state

## Running the Application

1. Run `docker-compose up -d` to start the containers
2. Open a web browser and navigate to `http://localhost:3000/api/v1/farms` to test the API

## Technologies Used

* Node.js
* Express.js
* PostgreSQL
* Docker