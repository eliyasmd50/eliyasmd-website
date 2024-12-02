if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3500;
const createUser = require('./model/api/createUser');
const sanitizeUser = require('./auth/sanitizeUser');
const ConnectDB = require('./controllers/connectDB');
const connectDB = new ConnectDB()
const authenticateUser = require('./auth/authenticateUser');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.get('/home', async (req, res) => {
    const result = await connectDB.getAllUsers();
    res.json({
        "messgae": "All data returned",
        "data": result
    })
})

app.post('/login',sanitizeUser, authenticateUser, (req, res) => {
    res.json({"message": "logged in successfully"})
})

app.post('/register', sanitizeUser, createUser);

app.listen(PORT, () => {
    console.log(`Server connected on the port ${PORT}`);
})