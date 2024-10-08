const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    test_name: { type: String, required: true },
    time_limit: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

module.exports = mongoose.model('Test', TestSchema);
