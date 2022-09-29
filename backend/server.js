require('dotenv').config()
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const { requestLogger } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use(requestLogger);

// Routes
app.use('/api/practice-text', require('./routes/api/practiceText'));

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
