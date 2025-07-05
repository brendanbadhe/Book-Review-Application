const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  let filteredUsers = users.filter((user) => {
    return user.username === username;
  });
  if (filteredUsers.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  let filteredUsers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (filteredUsers.length > 0) {
    return true;
  } else {
    return false;
  }
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({ data: password }, "access", {
      expiresIn: 60 * 60,
    });

    req.session.authorization = {
      accessToken,
      username,
    };

    return res.status(200).send("Customer successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    const username = req.session.authorization.username;
    const review = req.body.review;
    if (review) {
      book.reviews[username] = review;
    }
    res.send(
      `The review for the book with ISBN ${isbn} has been added/updated.`
    );
  } else {
    res.send("Unable to find book");
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const book = books[isbn];
  const username = req.session.authorization.username;

  if (book) {
    delete book.reviews[username];
  }
  res.send(
    `Reviews for the ISBN ${isbn} posted by the user ${username} deleted.`
  );
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
