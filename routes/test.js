const express = require('express');
const Test = require('../models/Test.js');
const Question = require('../models/Question.js');
const router = express.Router();

// Create Test
router.post('/create', async (req, res) => {
    const { test_name, time_limit, questions } = req.body;
    try {
        const newTest = new Test({ test_name, time_limit });
        await newTest.save();

        for (let q of questions) {
            const newQuestion = new Question({
                test_id: newTest._id,
                question_text: q.question_text,
                options: q.options,
                correct_answer: q.correct_answer
            });
            await newQuestion.save();
            newTest.questions.push(newQuestion._id);
        }
        await newTest.save();
        res.json({ message: 'Test created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Tests
router.get('/', async (req, res) => {
    try {
        const tests = await Test.find().populate('questions');
        res.json(tests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
