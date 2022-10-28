const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

const categories = require('./Data/categories.json');
const courses = require('./Data/courses.json');

app.get('/', (req, res) => {
    res.send('Server is active.');
});

app.get('/course-categories', (req, res) => {
    res.send(categories);
});

app.get('/category/:id', (req, res) => {
    const id = req.params.id;
    if (id === '00')
        res.send(courses);
    else {
        const category = categories.filter(course => course.category_id === id);
        res.send(category);
    }
});

app.listen(port, () => {
    console.log('Server is active on port: ', port);
});