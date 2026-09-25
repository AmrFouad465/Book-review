const {
  getAllBooks,
  getBookByISBN,
  getBooksByTitle,
  getBooksByAuthor,
  getBookReview,
  addNewReview,
  modifyReview,
  deleteReview,
} = require("../models/book");

const getAll = (req, res) => {
  let result = getAllBooks();
  return res.status(200).json(result);
};

const getByISBN = (req, res) => {
  let ISBN = req.params.ISBN;
  if (!ISBN) {
    return res.status(400).json({ message: "Invalid ISBN" });
  }

  const result = getBookByISBN(ISBN);
  if (!result) {
    return res
      .status(204)
      .json({ message: `Book not found with ISBN:${ISBN}` });
  }

  return res.status(200).json(result);
};

const getByTitle = (req, res) => {
  let title = req.params.title;
  if (!title) {
    return res.status(400).json({ message: "Invalid title" });
  }

  const result = getBooksByTitle(title);
  if (!result) {
    return res
      .status(204)
      .json({ message: `Book not found with title:${title}` });
  }

  return res.status(200).json(result);
};

const getByAuthor = (req, res) => {
  let author = req.params.author;
  if (!author) {
    return res.status(400).json({ message: "Invalid author" });
  }

  const result = getBooksByAuthor(author);
  if (!result) {
    return res
      .status(204)
      .json({ message: `Book not found with author:${author}` });
  }

  return res.status(200).json(result);
};

const getReview = (req, res) => {
  let ISBN = req.params.ISBN;
  if (!ISBN) {
    return res.status(400).json({ message: "Invalid ISBN" });
  }

  const result = getBookReview(ISBN);
  if (result.length===0) {
    return res.status(200).json({ "message": `There is no reviews for this Book with ISBN:${ISBN}` });
  }
  return res.status(200).json(result);
};

module.exports.public = {
  getAll,
  getByISBN,
  getByAuthor,
  getByTitle,
  getReview,
};

const addReview = (req, res) => {
  let userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "UnAuth user" });
  }

  const ISBN = req.params.ISBN;
  if (!ISBN) {
    return res.status(400).json({ message: "Invalid ISBN" });
  }

  const { review, comment } = req.body;
  if (!review || !comment) {
    return res.status(400).json({ message: "review or the comment is empty" });
  }

  if (addNewReview(userId, ISBN, review, comment)) {
    return res.status(201).json({ message: "review added" });
  } else {
    return res.status(400).json({ message: "review already exist" });
  }
};

const modifingReview = (req, res) => {
  let userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "UnAuth user" });
  }

  const ISBN = req.params.ISBN;
  if (!ISBN) {
    return res.status(400).json({ message: "Invalid ISBN" });
  }

  const { review, comment } = req.body;
  if (!review || !comment) {
    return res.status(400).json({ message: "review or the comment is empty" });
  }

  if (modifyReview(userId, ISBN, review, comment)) {
    return res.status(201).json({ message: "review modified" });
  } else {
    return res.status(400).json({ message: "review not exist" });
  }
};

const deleteTheReview = (req, res) => {
  let userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "UnAuth user" });
  }

  const ISBN = req.params.ISBN;
  if (!ISBN) {
    return res.status(400).json({ message: "Invalid ISBN" });
  }

  if (deleteReview(userId, ISBN)) {
    return res.status(200).json({ message: "review Deleted" });
  } else {
    return res.status(400).json({ message: "review not exist" });
  }
};

module.exports.authenticated = { addReview, modifingReview, deleteTheReview };
