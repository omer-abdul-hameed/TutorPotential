require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./models');
const app = express();
const cookieParser = require ('cookie-parser')

// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:5173',  // This should match your frontend's origin
    credentials: true
};

// Middlewares
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./controllers/users'));
app.use('/api/students', require('./controllers/students'));
app.use('/api/tutors', require('./controllers/tutors'));

// SPA Fallback for unmatched routes
app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Assuming you connect to your database elsewhere in the code
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
