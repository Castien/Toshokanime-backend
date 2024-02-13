import mongoose from 'mongoose';

console.log(process.env.ATLAS_URI);
const connectionString = process.env.ATLAS_URI || "";

try {
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Connected to MongoDB`);
} catch (err) {
    console.error('Error connecting to MongoDB:', err);
}

export default mongoose.connection;
