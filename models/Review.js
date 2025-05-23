const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
    },
}, {timestamps: true});

reviewSchema.index({ book: 1, user: 1 }, { unique: true }); // Ensure that each user can only review a book once

module.exports = mongoose.model('Review', reviewSchema);