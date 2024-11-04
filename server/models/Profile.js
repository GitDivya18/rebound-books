const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    profileImg: {
        type: String
    },
    username: {
        type: String,
    },
    dob: {
        type: Date
    },
    phone: {
        type: Number
    },
    address: {
        type: String
    },
    prefrences: {
        type: String
    },
    thought: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'profile'
});

module.exports = mongoose.model('profile', profileSchema); // Changed model name to 'Profile' and corrected export
