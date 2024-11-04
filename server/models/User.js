const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookPost'
    }],
    ordersList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
