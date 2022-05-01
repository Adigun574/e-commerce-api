const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true 
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        rate: {
            type: Number
        },
        count: {
            type: Number
        }
    }
});

const User = mongoose.model('Product', ProductSchema);

module.exports = User;