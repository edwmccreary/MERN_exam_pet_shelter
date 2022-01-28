const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Test Title is required"],
        minlength: [1, "Test title must be atleast 1 character long"]
    },
    price: {
        type: Number,
        required: [true, "Test Price is required"],
        min: [1, "Test must cost atleast 1 dollar"]
    },
    description: {
        type: String,
        required: [true, "Test Description is required"],
        minlength: [1, "Test description must be atleast 1 character long"]
    }
}, {timestamps: true});

const Test = mongoose.model("Test", TestSchema);

module.exports = Test;