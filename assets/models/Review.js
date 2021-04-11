const mongoose = require('mongoose')

const Review = mongoose.model('Reviews', {
    title: {
        type: String,
        requiredL: true
    },
    description: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    }
})

module.exports = Review