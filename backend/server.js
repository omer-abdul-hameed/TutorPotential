require('dotenv').config()
const path = require('path');
const express = require('express');
const cors = require('cors')
const db = require('./models');
const app = express();


const commentsCtrl = require('./controllers/comments')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(path.dirname(__dirname), 'frontend', 'dist')))

app.use('/api/comments', commentsCtrl)

app.get('*', (req, res) => {
    res.sendFile(path.join(path.dirname(__dirname), 'frontend', 'dist', 'index.html'));
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});

