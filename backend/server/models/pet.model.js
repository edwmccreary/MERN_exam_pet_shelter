const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pet name is required"],
        minlength: [3, "Pet name must be atleast 3 characters long"]
    },
    type: {
        type: String,
        required: [true, "Pet type is required"],
        minlength: [3, "Pet type must be atleast 3 characters long"]
    },
    description: {
        type: String,
        required: [true, "Pet description is required"],
        minlength: [3, "Pet description must be atleast 3 characters long"]
    },
    skill_1: {
        type: String
    },
    skill_2: {
        type: String
    },
    skill_3: {
        type: String
    },
    likes: {
        type: Number
    }
}, {timestamps: true});

const Pet = mongoose.model("Pet", PetSchema);

module.exports = Pet;