const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/mydatabase', {useNewUrlParser: true, useUnifiedTopology: true});

// Define a schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: String,
    email: String,
    message: String
});

// Define a model
const User = mongoose.model('User', UserSchema);

// middleware untuk parsing body dari request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/form', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });

    user.save()
        .then(() => res.status(200).json({ message: "Data has been saved to MongoDB" }))
        .catch((error) => res.status(500).json({ message: "Error saving data to MongoDB", error }));
});

app.get('/data', (req, res) => {
    User.find({})
        .then((users) => res.status(200).json(users))
        .catch((error) => res.status(500).json({ message: "Error fetching data from MongoDB", error }));
});

const port = 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));