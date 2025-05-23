const express = require('express');
const router = express.Router();
const book = require('../controllers/Book');
const auth = require('../middleware/authMiddleware');

router.post('/addBook', auth, book.addBook);
router.get('/getBooks', auth, book.getBooks);
router.get('/getBookById/:id', auth, book.getBookById);

module.exports = router;