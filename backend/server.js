require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const { requestLogger } = require('./middleware/logger');

// Middleware
app.use(express.json());

app.use(requestLogger);

// Routes
app.use('/api/practice-text', require('./routes/api/practiceText'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
