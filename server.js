const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('./models/Data'); // Import the model
const dotenv =require("dotenv");

const app = express();
dotenv.config();

const port = Process.env.PORT;

mongoose.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/data', async (req, res) => {
    try {
        const data = await Data.findOne(); // Fetch the latest data
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.post('/api/data', async (req, res) => {
    const { hashRate, earnings, systemHealth } = req.body;
    const data = new Data({ hashRate, earnings, systemHealth });
    
    try {
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
