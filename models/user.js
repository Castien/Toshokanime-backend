import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    biography: { type: String },
    profileImage: { type: String },
    isAdmin: { type: Boolean, default: false},
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;
