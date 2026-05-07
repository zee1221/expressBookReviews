const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({
      message: "Unable to register user"
    });
  }

  if (!isValid(username)) {

    users.push({
      username: username,
      password: password
    });

    return res.status(200).json({
      message: "User successfully registered. Now you can login"
    });

  } else {

    return res.status(404).json({
      message: "User already exists!"
    });

  }

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
   return res.status(200).send(JSON.stringify(books, null, 4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
   const isbn = req.params.isbn;

  return res.status(200).json(books[isbn]);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
   const author = req.params.author;

  let filteredBooks = {};

  Object.keys(books).forEach(key => {

    if (books[key].author === author) {
      filteredBooks[key] = books[key];
    }
  });
  return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
   const title = req.params.title;

  let filteredBooks = {};

  Object.keys(books).forEach((key) => {

    if (books[key].title === title) {
      filteredBooks[key] = books[key];
    }

  });

  return res.status(200).json(filteredBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  
  const isbn = req.params.isbn;

  return res.status(200).json(books[isbn].reviews);
});

public_users.get('/async/books', async function (req, res) {

  try {

    const response = await axios.get('http://localhost:5000/');

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(500).json({
      message: "Error fetching books"
    });

  }

});

public_users.get('/async/isbn/:isbn', async function (req, res) {

  const isbn = req.params.isbn;

  try {

    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(500).json({
      message: "Error fetching book by ISBN"
    });

  }

});

public_users.get('/async/author/:author', async function (req, res) {

  const author = req.params.author;

  try {

    const response = await axios.get(`http://localhost:5000/author/${author}`);

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(500).json({
      message: "Error fetching books by author"
    });

  }

});

public_users.get('/async/title/:title', async function (req, res) {

  const title = req.params.title;

  try {

    const response = await axios.get(`http://localhost:5000/title/${title}`);

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(500).json({
      message: "Error fetching books by title"
    });

  }

});

module.exports.general = public_users;
