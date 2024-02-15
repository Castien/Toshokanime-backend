const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8 },
    biography: { type: String },
    profileImage: { type: String },
    isAdmin: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now },
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

module.exports = User;
