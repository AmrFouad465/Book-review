const express = require("express");
const router = express.Router();
const { getAll, getByISBN, getByAuthor, getByTitle, getReview } = require("../controllers/book").public;
router.get("/", getAll);
router.get("/isbn/:ISBN", getByISBN);
router.get("/author/:author", getByAuthor);
router.get('/title/:title',getByTitle);
router.get("/review/:ISBN", getReview);
module.exports = router;
