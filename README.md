# Auth-Contact Manager API

## Overview

This project is an API built with Node.js, Express, MongoDB, and JWT authentication. It provides contact management functionality along with user authentication.

## Description

The API offers user registration, authentication, and CRUD operations for managing contacts stored in a MongoDB database. It ensures secure access to user-specific data by implementing JWT-based authentication.

## Key Features

- `User Authentication`: Register and log in securely using JWT authentication.
- `Subscription Levels`: Choose between 'starter', 'pro', or 'business' subscription tiers.
- `Contact Management`: Perform CRUD operations on contacts, including favorites.
- `Security Measures`: Safely store passwords with bcrypt encryption.
- `Scalability`: Implement pagination for efficient contact handling.
- `Middleware-based Security`: Token validation ensures authorized access.

## Usage

### - Installation

- Clone the repository and install dependencies.
- Set up environment variables like MongoDB URI and JWT secret key in a .env file.

### - User Authentication

- Create endpoints for user registration (/users/signup) and login (/users/login).
- Implement token-based authentication for secure user access.

### - User Management

- Develop routes for updating user subscriptions (/users) and fetching current user details (/users/current).

### - Contact Operations

- Create CRUD endpoints for managing contacts (/api/contacts).
- Add a PATCH endpoint to update contact favorites (/api/contacts/:contactId/favorite).

### - API Structure

- `models/contacts.js`: Functions for CRUD operations on contacts.
- `routes/api/contacts.js`: Defines API routes and controllers.
- `controllers/contacts.js`: Handles requests and interacts with the contact model.
- `middlewares/validate.js`: Middleware for request body validation using Joi.
- `schemas/contacts.js`: Joi schemas for request body validation.

### - Dependencies

`express`, `mongoose`, `joi`, `jsonwebtoken`, `bcrypt`

## Contributing

Feel free to contribute by opening issues or creating pull requests.
