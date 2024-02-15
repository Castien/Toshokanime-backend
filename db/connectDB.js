const mongoose = require("mongoose");

const connectDB = async () => {
 try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.ATLAS_URI);
    console.log(`MongoDB connection ${conn.connection.host}`);
} catch (error) {
    console.log(error);
    process.exit(1);
 }
};

module.exports = connectDB;