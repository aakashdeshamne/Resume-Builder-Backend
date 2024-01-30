const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB = require('./config/db');;
const cors = require("cors");
const path = require('path');
connectDB();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.json({msg:'Welcome to the Resume Builder Api'}));

// Add your route handlers
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resume', require('./routes/routes'));

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log('Listening on port', { port: PORT });
});
