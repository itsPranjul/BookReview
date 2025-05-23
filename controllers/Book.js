const {Book} = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
    try {
        const book = new Book({ 
            ...req.body, 
            createdBy: req.user._id 
        });

        await book.save();

        res.status(201).json({
            success: true,
            book,
            message: 'Book added successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add book',
            error: error.message,
        }); 
    }
}


// Get Books

exports.getBooks = async (req, res) => {
    const { page = 1, limit = 10, author, genre } = req.query;
    const filter = {};

    if(author) {
        filter.author = new RegExp(author,'i');
    }
    if(genre) {
        filter.genre = new RegExp(genre,'i');
    }
    try {
        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ createdAt: -1 });
        const totalBooks = await Book.countDocuments(filter);
        res.status(200).json({
            success: true,
            books,
            totalBooks,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error: error.message,
        });
    }
}

//getBooksDetails
exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }
        const reviews = await Review.find({ book: id });
        const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / (reviews.length || 1);
        res.status(200).json({
            success: true,
            book,
            reviews,
            avgRating,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch book details',
            error: error.message,
        });
    }
}