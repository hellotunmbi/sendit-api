[![Build Status](https://travis-ci.org/hellotunmbi/sendit-api.svg?branch=master)](https://travis-ci.org/hellotunmbi/sendit-api)

# sendit-api

NodeJS API for SendIT

## Stacks

- Node JS
- Mocha and Chai tests
- ESLint
- Travis CI
- Babel for transpiling

### Base URL: https://sendit-hook.herokuapp.com/api/v1

## /parcels

- GET /parcels - Fetches all parcel delivery orders
- GET /parcels/:id - Fetch a specific parcel delivery
- POST /parcels - Create new parcel
- PATCH /parcels/:id/cancel - Cancel a specific parcel delivery order
- GET /users/:userId/parcels - Fetch all parcel delivery order by a specific user

- PATCH /parcels/:id/destination - Change the delivery destination of an order
- PATCH /parcels/:id/status - Change the status of an order
- PATCH /parcels/:id/currentlocation - Update the current location of an order

## /auth

- POST /auth/signup - registers a new user
- POST /auth/login - logs in existing user
