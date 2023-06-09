require('dotenv').config()
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const authenticateToken = require('./middleware/authenticateToken');
const connectDB = require('./config/dbConnection');
const corsOptions = require('./config/corsOptions');
const { requestLogger } = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(requestLogger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/practice-texts', require('./routes/api/practiceTexts'));

app.use('/auth', require('./routes/auth'));
app.use('/register', require('./routes/register'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});
