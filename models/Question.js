const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    question_text: { type: String, required: true },
    options: [String],
    correct_answer: { type: String, required: true }
});

module.exports = mongoose.model('Question', QuestionSchema);
