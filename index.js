const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());

app.get('/', (req, res) => {
    res.send('Server is active.');
});

app.listen(port, () => {
    console.log('Server is active on port: ', port);
});