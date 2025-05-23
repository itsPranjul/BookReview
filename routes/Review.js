const express = require('express');
const router = express.Router();
const review = require('../controllers/Review');
const auth = require('../middleware/authMiddleware');

router.post('/addReview/:id', auth, review.addReview);
router.put('/updateReview/:id', auth, review.updateReview);
router.delete('/deleteReview/:id', auth, review.deleteReview);

module.exports = router;