// import mongoose from 'mongoose';
// import User from './models/user.js';

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://Castien:TemporaryPW@mongopractice.lcbf0fe.mongodb.net/toshokanime', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => {
//     console.log('Connected to MongoDB');

//     // Define test user data
//     const testUserData = {
//         username: 'Overlord',
//         email: 'lordainz@example.com',
//         password: 'stuckinagame',
//         biography: 'I will take over the world.',
//         isAdmin: true //admin status
//     };

//     // Create a new user document
//     const testUser = new User(testUserData);

//     // Save the user to the database
//     testUser.save()
//         .then(() => {
//             console.log('Admin test user added successfully');
//             // Close the MongoDB connection after adding the user
//             mongoose.connection.close();
//         })
//         .catch(err => console.error('Error adding admin test user:', err));
// })
// .catch(err => console.error('Error connecting to MongoDB:', err));
