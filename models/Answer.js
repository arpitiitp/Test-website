const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    test_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    user_answers: [{
        question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selected_option: String
    }]
});

module.exports = mongoose.model('Answer', AnswerSchema);
