const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./db');
const imageRoutes = require('./routes/imageRoutes');
const path = require('path');

const app = express();
const port = 5000;

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Routes
app.use('/images', imageRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
