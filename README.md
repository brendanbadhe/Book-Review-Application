# Book Review Application

## Project Overview

This is a server-side online book review application built with Node.js and Express.js. It allows users to view, search, and manage book ratings and reviews. The application uses RESTful API endpoints and implements session-level authentication using JWT.

## Scenario

You are a back-end developer for an online book retailer. Your task is to develop a server-side application that stores, retrieves, and manages book ratings and reviews. The application supports multiple users and provides secure access to review management features.

## Features

- Retrieve a list of all books available in the bookshop
- Search for books by ISBN, author, or title
- Retrieve reviews/comments for specified books
- Register as a new user
- Login as a registered user
- Add, modify, or delete book reviews (logged-in users only)
- Multiple users can access and manage reviews simultaneously

## Technologies Used

- Node.js
- Express.js
- express-session
- jsonwebtoken (JWT)

## Setup Instructions

1. **Clone the repository:**

   ```sh
   git clone https://github.com/brendanbadhe/Book-Review-Application.git
   cd Book-Review-Application
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the server:**

   ```sh
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

### General User Endpoints

- `GET /` : Get the list of all books
- `GET /isbn/:isbn` : Get book details by ISBN
- `GET /author/:author` : Get books by author
- `GET /title/:title` : Get books by title
- `GET /review/:isbn` : Get reviews for a book
- `POST /register` : Register a new user

### Registered User Endpoints

- `POST /customer/login` : Login as a registered user
- `PUT /customer/auth/review/:isbn` : Add/modify a book review
- `DELETE /customer/auth/review/:isbn` : Delete your book review

## Authentication

Session and JWT authentication are used to restrict access to review management endpoints. Only logged-in users can add, modify, or delete reviews.

## Asynchronous Operations

All main CRUD operations (get books, search by ISBN, author, title) are implemented using Promises or async/await to support concurrent user access.

## Testing

You can test the API endpoints using Postman or curl.

## Screenshots

Example screenshots of API usage and application features are available in the [`Images/` folder](./Images/).
