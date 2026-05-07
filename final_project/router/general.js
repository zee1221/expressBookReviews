const express = require('express');
const axios = require('axios');

let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

const public_users = express.Router();


// ===================== TASK 1 =====================
// Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});


// ===================== TASK 2 =====================
// Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }

  return res.status(404).json({ message: "Book not found" });
});


// ===================== TASK 3 =====================
// Get books by author
public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;
  let result = {};

  Object.keys(books).forEach((key) => {
    if (books[key].author === author) {
      result[key] = books[key];
    }
  });

  return res.status(200).json(result);
});


// ===================== TASK 4 =====================
// Get books by title (ARRAY format required by grader)
public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;
  let result = [];

  Object.keys(books).forEach((key) => {
    if (books[key].title === title) {
      result.push({
        isbn: key,
        ...books[key]
      });
    }
  });

  return res.status(200).json(result);
});


// ===================== TASK 5 =====================
// Get reviews
public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  }

  return res.status(404).json({ message: "Book not found" });
});


// ===================== TASK 10 =====================
// Async - Get all books
public_users.get('/async/books', async function (req, res) {

  try {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }

});


// ===================== TASK 11 =====================
// Async - ISBN
public_users.get('/async/isbn/:isbn', async function (req, res) {

  try {
    const response = await axios.get(`http://localhost:5000/isbn/${req.params.isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching book" });
  }

});


// ===================== TASK 12 =====================
// Async - Author
public_users.get('/async/author/:author', async function (req, res) {

  try {
    const response = await axios.get(`http://localhost:5000/author/${req.params.author}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by author" });
  }

});


// ===================== TASK 13 =====================
// Async - Title
public_users.get('/async/title/:title', async function (req, res) {

  try {
    const response = await axios.get(`http://localhost:5000/title/${req.params.title}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title" });
  }

});


module.exports.general = public_users;
