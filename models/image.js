// image.js : this is the image schema
const mongoose = require('mongoose')

// define a schema that maps a structure of the data in MongoDB
const imageSchema = new mongoose.Schema(
    {
        image: {
            type: String, 
            unique: true
        },
        alt: String,
        content: String,
    },
    {
        methods: {
            
        }
    }
)

// create the model
module.exports = mongoose.model('image', imageSchema)