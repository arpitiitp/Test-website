const express = require('express');
const Answer = require('../models/Answer.js');
const Test = require('../models/Test.js');
const Question = require('../models/Question.js');
const router = express.Router();

// Submit answers
router.post('/submit', async (req, res) => {
    const { user_id, test_id, user_answers } = req.body;
    try {
        let score = 0;
        for (let answer of user_answers) {
            const question = await Question.findById(answer.question_id);
            if (question.correct_answer === answer.selected_option) {
                score++;
            }
        }
        const newAnswer = new Answer({ user_id, test_id, user_answers });
        await newAnswer.save();

        res.json({ score });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
