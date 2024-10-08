const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    test_attempts: [{ test_id: String, score: Number }]
});

module.exports = mongoose.model('User', UserSchema);
