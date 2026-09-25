class book {
  #ISBN;
  #author;
  #title;
  #reviews;
  constructor(ISBN, author, title) {
    this.#ISBN = ISBN;
    this.#author = author;
    this.#title = title;
    this.#reviews = [];
  }
  getISBN() {
    return this.#ISBN;
  }
  getAuthor() {
    return this.#author;
  }
  getTitle() {
    return this.#title;
  }
  getReviews() {
    return this.#reviews;
  }
  setISBN(ISBN) {
    this.#ISBN = ISBN;
  }
  setAuthor(author) {
    this.#author = author;
  }
  setTitle(title) {
    this.#title = title;
  }
  addReview(review) {
    this.#reviews.push(review);
  }
  parseJson() {
    let ISBN = this.#ISBN;
    let author = this.#author;
    let title = this.#title;
    let bookJson = { ISBN: ISBN, author: author, title: title };
    return bookJson;
  }
}

class Review {
  #userid;
  #review;
  #comment;
  #deleted;
  constructor(userid, review, comment = "") {
    this.#userid = userid;
    this.#review = Math.max(Math.min(5, review),0);
    this.#comment = comment;
    this.#deleted = false;
  }
  getUserId() {
    return this.#userid;
  }
  getReview() {
    return this.#review;
  }
  getComment() {
    return this.#comment;
  }
  isDeleted() {
    return this.#deleted;
  }
  setReview(review) {
    this.#review = Math.max(Math.min(5, review),0);
  }
  setComment(comment) {
    this.#comment = comment;
  }
  delete() {
    this.#deleted = true;
  }
  restore() {
    this.#deleted = false;
  }
  parseJson() {
    let userid = this.#userid;
    let review = this.#review;
    let comment = this.#comment;
    let reviewJson = { userid: userid, review: review, comment: comment };
    return reviewJson;
  }
}
const DB = [
  new book("978-3-16-148401-0", "Stephen King", "Shadows of the Past Vol. 1"),
  new book("978-3-16-148402-0", "Agatha Christie", "The Adventure Vol. 2"),
  new book("978-3-16-148403-0", "George Orwell", "The Hidden Gate Vol. 3"),
  new book("978-3-16-148404-0", "George Orwell", "The Adventure Vol. 4"),
  new book("978-3-16-148405-0", "George Orwell", "Chronicles of Time Vol. 5"),
  new book("978-3-16-148406-0", "Harper Lee", "The Hidden Gate Vol. 6"),
  new book("978-3-16-148407-0", "Stephen King", "The Hidden Gate Vol. 7"),
  new book("978-3-16-148408-0", "Harper Lee", "Journey to the Edge Vol. 8"),
  new book(
    "978-3-16-148409-0",
    "Agatha Christie",
    "Shadows of the Past Vol. 9",
  ),
  new book("978-3-16-148410-0", "George Orwell", "Shadows of the Past Vol. 10"),
  new book(
    "978-3-16-148411-0",
    "J.R.R. Tolkien",
    "Journey to the Edge Vol. 11",
  ),
  new book(
    "978-3-16-148412-0",
    "J.R.R. Tolkien",
    "Journey to the Edge Vol. 12",
  ),
  new book("978-3-16-148413-0", "J.K. Rowling", "Journey to the Edge Vol. 13"),
  new book("978-3-16-148414-0", "George Orwell", "Shadows of the Past Vol. 14"),
  new book("978-3-16-148415-0", "Stephen King", "Silent Echoes Vol. 15"),
  new book("978-3-16-148416-0", "J.K. Rowling", "Silent Echoes Vol. 16"),
  new book("978-3-16-148417-0", "J.K. Rowling", "The Hidden Gate Vol. 17"),
  new book("978-3-16-148418-0", "Agatha Christie", "The Hidden Gate Vol. 18"),
  new book("978-3-16-148419-0", "Stephen King", "Journey to the Edge Vol. 19"),
  new book("978-3-16-148420-0", "Agatha Christie", "The Hidden Gate Vol. 20"),
];
// ------GENERAL-----------
const getAllBooks = function () {
  return DB.map((e)=>e.parseJson());
};
const getBookByISBN = function (ISBN) {
  let book = DB.filter((e) => e.getISBN() === ISBN);
  if (book.length > 0) {
    return book[0].parseJson();
  }
  return null;
};
const getBooksByAuthor = function (author) {
  let books = DB.filter((e) => e.getAuthor() === author);
  if (books.length > 0) {
    return books.map((e)=>e.parseJson());
  }
  return null;
};
const getBooksByTitle = function (title) {
  let books = DB.filter((e) => e.getTitle().includes(title));
  if (books.length > 0) {
    return books.map((e)=>e.parseJson());
  }
  return null;
};
const getBookReview = function (ISBN) {
  let book = DB.filter((e) => e.getISBN() === ISBN);
  if (book.length > 0) {
    let b = book[0];
    return b.getReviews().filter((e) => !e.isDeleted()).map((e)=>e.parseJson());
  }
  return null;
};
//-----------Auth_User------------
function userReviewedBook(userId, book) {
  let rev = book.getReviews().filter((e) => e.getUserId() === userId);
  if (rev.length > 0) {
    return [true, rev[0], rev[0].isDeleted()];
  }
  return [false, null, true];
}
const addNewReview = (userId, ISBN, review, comment) => {
  let book = DB.filter((e)=>e.getISBN()===ISBN);
  if(book.length===0){
    return false;
  }
  const [Reviewed, rev, deleted] = userReviewedBook(userId,book[0]);
  if (Reviewed && deleted) {
    rev.setReview(review);
    rev.setComment(comment);
    rev.restore();
    return true;
  } else if (Reviewed && !deleted) {
    return false;
  } else {
    let rev = new Review(userId, review, comment);
    book[0].addReview(rev);
    return true;
  }
};
const modifyReview = (userId, ISBN, review, comment) => {
  let book = DB.filter((e)=>e.getISBN()===ISBN);
  if(book.length===0){
    return false;
  }
  const [Reviewed, rev, deleted] = userReviewedBook(userId, book[0]);
  if (!Reviewed || deleted) {
    return false;
  } else {
    if ((review || review === 0 ) && !isNaN(review)) rev.setReview(review);
    if (comment) rev.setComment(comment);
    return true;
  }
};

const deleteReview = (userId, ISBN) => {
  let book = DB.filter((e)=>e.getISBN()===ISBN);
  if(book.length===0){
    return false;
  }
  const [Reviewed, rev, deleted] = userReviewedBook(userId, book[0]);
  if (!Reviewed || deleted) {
    return false;
  } else {
    rev.delete();
    return true;
  }
};
module.exports={getAllBooks,getBookByISBN,getBooksByAuthor,getBooksByTitle,getBookReview,addNewReview,modifyReview,deleteReview};