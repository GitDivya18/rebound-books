const express = require('express');
const db = require('../server/db');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

dotenv.config();
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use('/public',express.static(path.join(__dirname, 'public')));

// Define your routes here
app.use('/user', require('./routers/user.controller'));
app.use('/api', require('./routers/profile.controller'));
app.use('/post', require('./routers/post.controller'));
app.use('/payment', require('./routers/payment.controller'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
