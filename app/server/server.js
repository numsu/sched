require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const port = process.env.PORT || 8000;

const mongoose = require('./util/MongooseClient');
mongoose.connect();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res)=> {
    res.send('Nothing to see here. Move along.');
});

app.use('/api', require('./api/ApiController'));

// Serve the React app on every other request
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
});

app.listen(port, _=> console.log(`The server is listening on port ${port}`));
