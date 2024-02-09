const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb+srv://Castien:TemporaryPW@mongopractice.lcbf0fe.mongodb.net/toshokanime', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');

    // Test user data
    const testUserData = {
        username: 'Azuma Kazuma',
        email: 'breadshow@example.com',
        password: 'japan!',
        biography: 'This is experimental Japan #000!'
    };

    // Create new user doc
    const testUser = new User(testUserData);

    // Save user to the DB
    testUser.save()
        .then(() => {
            console.log('Test user added successfully');
            // Close DB connection after adding user
            mongoose.connection.close();
        })
        .catch(err => console.error('Error adding test user:', err));
})
.catch(err => console.error('Error connecting to DB:', err));
