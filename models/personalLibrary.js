const mongoose = require('mongoose');

const personalLibrarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    creationDate: { type: Date },
    description: { type: String },
    isPublic: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const PersonalLibrary = mongoose.model('PersonalLibrary', personalLibrarySchema);

module.exports = PersonalLibrary;
