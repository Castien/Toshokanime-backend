import mongoose from 'mongoose';

const userLibrarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    entryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Main' },
    additionalColumns: { type: Object }, // Define additional columns here
    isPublic: { type: Boolean },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const UserLibrary = mongoose.model('UserLibrary', userLibrarySchema);

module.exports = UserLibrary;
