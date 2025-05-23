const {Book} = require('../models/Book'); // FIXED: removed destructuring

exports.searchBooks = async (req, res) => {
    try {
        const { query } = req.params;
        const regex = new RegExp(query, 'i'); // Case-insensitive regex

        const books = await Book.find({
            $or: [
                { title: regex },
                { author: regex }
            ]
        }).sort({ createdAt: -1 });

        if (books.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No books found for the given query',
            });
        }

        res.status(200).json({
            success: true,
            books,
            message: 'Books fetched successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch books',
            error: error.message,
        });
    }
};
