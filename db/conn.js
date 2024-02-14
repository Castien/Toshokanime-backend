/**
 * sets up a connection to a MongoDB database 
 * using Mongoose in a Node.js application
 * 
 * conn.js:
 * retrieveMongoDB connection from the environment variable ATLAS_URI
 */
import mongoose from 'mongoose';

/**  rethrow the error to be caught by the caller to
 * avoid async function returning rejected promise
 */

export default async function mongoConn() {
    try {
        await mongoose.connect(process.env.ATLAS_URI || "");
        console.log('Connected to mongodb');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}