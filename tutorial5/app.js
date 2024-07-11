const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Enable CORS for the frontend URL
const corsOptions = {
    origin: 'https://group16-app.netlify.app',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let users = [
    {
        id: "5abf6783",
        email: "abc@abc.ca",
        firstName: "ABC"
    },
    {
        id: "5abf674563",
        email: "xyz@xyz.ca",
        firstName: "XYZ"
    }
];

// GET /users
app.get('/users', (req, res) => {
    res.status(200).json({
        message: "Users retrieved",
        success: true,
        users: users
    });
});

// GET /users/:id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex !== -1) {
        res.status(200).json({
            success: true,
            user: users[userIndex]
        });
    } else {
        res.status(404).json({
            message: "User not found",
            success: false
        });
    }
});

// POST /users/add
app.post('/users/add', (req, res) => {
    const { email, firstName } = req.body;

    if (!email || !firstName) {
        return res.status(400).json({
            message: "Email and/or firstName are required",
            success: false
        });
    }

    console.log(req.body);
    const newUser = {
        id: uuidv4(),
        email: email,
        firstName: firstName
    };
    users.push(newUser);
    res.status(201).json({
        message: "User added",
        success: true,
        user: newUser
    });
});

// PUT /update/:id
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { email, firstName } = req.body;

    if (!email || !firstName) {
        return res.status(400).json({
            message: "Email and/or firstName are required",
            success: false
        });
    }

    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
        users[userIndex] = { id, email, firstName };
        res.status(200).json({
            message: "User updated",
            success: true
        });
    } else {
        res.status(404).json({
            message: "User not found",
            success: false
        });
    }
});

module.exports = app;
