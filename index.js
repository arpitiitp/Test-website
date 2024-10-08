const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/test');
const answerRoutes = require('./routes/answer');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/answer', answerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
