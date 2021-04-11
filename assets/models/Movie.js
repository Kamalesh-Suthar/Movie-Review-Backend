const mongoose = require('mongoose')

const Movie = mongoose.model('Movies', {
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    yearOfRelease: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})


module.exports = Movie