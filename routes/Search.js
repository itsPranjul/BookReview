const express = require('express');
const router = express.Router();

const searchController = require('../controllers/Search'); 

// Search books route: GET /api/search/:query
router.get('/:query', searchController.searchBooks);

module.exports = router;
