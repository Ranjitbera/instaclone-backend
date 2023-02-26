let mongoose = require('mongoose')

let userData = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required:true
        
    },
    likes: {
        type: Number,
        default: 50
    },
    image: {
        data:Buffer,
        contentType: String
    }
})

let model = mongoose.model("datacollection", userData)

module.exports = model;