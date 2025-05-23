const Review = require('../models/Review');

// Add Review

exports.addReview = async (req, res) => {
    try {
        console.log('req.user:', req.user);
        const review = new Review({
            ...req.body,
            user: req.user.id,
            book: req.params.id,
        });
        console.log(req.user._id);
        await review.save();
        res.status(201).json({
            success: true,
            review,
            message: 'Review added successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add review',
            error: error.message,
        });
    }
}

//Update Review

exports.updateReview = async (req, res) => {
    try{
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true }
        );
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }
        return res.status(200).json({
            success: true,
            review,
            message: 'Review updated successfully',
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update review',
            error: error.message,
        });
    }
};


//Delete Review

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete review',
            error: error.message,
        });
    }
}