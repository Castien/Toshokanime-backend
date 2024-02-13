/**
 * sets up a connection to a MongoDB database 
 * using Mongoose in a Node.js application
 * 
 * conn.js:
 * retrieveMongoDB connection from the environment variable ATLAS_URI
 * initialize connectionString w/ process.env.ATLAS_URI, defaults to empty string
 * Mongoose connect method, passes connectionString and options object as arguments
 * exports function named getConnection that returns Mongoose connection object
 */

import mongoose from 'mongoose';

console.log(process.env.ATLAS_URI);
const connectionString = process.env.ATLAS_URI || "";

/**
 * useNewUrlParser: true - 
 * prevents your application from generating deprecation warnings
 * 
 * useUnifiedTopology: true -
 * enables Mongoose to use latest MongoDB driver topology engine
 * monitors MongoDB server handling/selection
 * for the client to send read and write operations.
 */
try {
    // Set maxTimeMS timeout option globally
    mongoose.set('maxTimeMS', 10000);

    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log(`Connected to MongoDB`);
} catch (err) {
    console.error('Error connecting to MongoDB:', err);
}

/**
 * Export function that returns the Mongoose connection object
 */ 
const getConnection = () => mongoose.connection;
export default getConnection;

