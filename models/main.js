import mongoose from 'mongoose';

const mainSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    volumeSubtitle: { type: String },
    format: { type: String },
    studios: { type: [String] },
    releaseDate: {
        type: Date,
        validate: {
            validator: function(valid) {
                // Regular expression to match YYYY-MM-DD format
                return /\d{4}-\d{2}-\d{2}/.test(valid);
            },
            message: props => `${props.value} is not a valid date in the format YYYY-MM-DD!`
        }
    },
    upcIsbn: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
});

const Main = mongoose.model('Main', mainSchema);

export default Main;

