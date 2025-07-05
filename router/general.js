const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({
        message: "Customer successfully registered. Now you can login",
      });
    } else {
      return res.status(400).json({ message: "Customer already registered!" });
    }
  }
  return res.status(400).json({ message: "Unable to register customer." });
});

/* 
//Synchronous Functionality

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn]);
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const filteredBooks = [];
  for (let key in books) {
    if (books[key].author === author) {
      filteredBooks.push(books[key]);
    }
  }
  res.send(filteredBooks);
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const filteredBooks = [];
  for (let key in books) {
    if (books[key].title === title) {
      filteredBooks.push(books[key]);
    }
  }
  res.send(filteredBooks);
});
*/

//Asynchronous Functionality using Promise callbacks (or Async-Await functions using Axios)

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 0);
  });

  myPromise.then((message) => {
    res.send(JSON.stringify(message, null, 4));
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  const isbn = req.params.isbn;

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books[isbn]);
    }, 0);
  });

  myPromise.then((message) => {
    res.send(message);
  });
});

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  const author = req.params.author;
  const filteredBooks = [];
  for (let key in books) {
    if (books[key].author === author) {
      filteredBooks.push(books[key]);
    }
  }

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(filteredBooks);
    }, 0);
  });

  myPromise.then((message) => {
    res.send(message);
  });
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  const title = req.params.title;
  const filteredBooks = [];
  for (let key in books) {
    if (books[key].title === title) {
      filteredBooks.push(books[key]);
    }
  }

  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(filteredBooks);
    }, 0);
  });

  myPromise.then((message) => {
    res.send(message);
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  res.send(book.reviews);
});

module.exports.general = public_users;
