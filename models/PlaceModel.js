const mongoose = require('mongoose');

const Movie = mongoose.model('Movie',{
    title: {
        type: String,
        require: true
    },
    release_date: {
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    imagepp:{
        type: String,
        require: true
    }
})

module.exports = Movie