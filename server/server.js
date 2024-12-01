if(process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const app = express();
const Login = require('./model/Login');
const User = require('./model/User');
const sanitizeInput = require('./auth/sanitizeInput');
const authenticateLogin = require('./auth/authenticateLogin');
const authorizeUser = require('./auth/authorizeUser');
// const flash = require('express-flash');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/API_crud");
        console.log("Db connected");
    } catch (error) {
        console.log(error.message);
    }
}
connectDB();// DB calling

//allowing cors for the client request
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    method: 'GET, POST',
    allowedHaders: 'Content-Type'
}

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.set('view-engine', 'ejs');
// app.use(flash());

//Read users
app.get('/login-user', async (req, res) => {
    const result = await Login.find();
    res.json({
        "message": "Success",
        "data" : result
    });
})

// Create user
app.post('/user-register', async (req, res) => {
    if (!req?.body?.password) return res.status(403).send({ status: 403, "message": "Enter a password"});
    const hashPwd = await bcrypt.hash(req.body.password, 10);

    const result = await Login.create({
        username: req.body.username,
        password: hashPwd
    })
    console.log(result);
    res.status(201).json({
        "message": "user successfully created",
        "data": result
    });
})

//Home Route
app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Eliyas'});
})

//login Route
app.get('/login', (req, res) => {
    res.render('login.ejs');
})

//backward compatability for the api's
app.post('/v2/login', authorizeUser, (req, res) => {
    console.log("After authentication routed successfully " + req.safeEmail + " Name: " + req.safeName );
    res.status(401).json({ status: "testing", message: "No issues under maintanance try later"})
})

app.post('/v1/login', sanitizeInput, authenticateLogin, (req, res) => {
    res.status(200).json({status: 'success', message: 'Form submitted Successfully'});
})

//Register Route
app.get('/register', (req, res) => {
    res.render('register.ejs');
})

app.post('/v1/register', sanitizeInput, async (req, res) => {
    try {
        const duplicate = await User.where("email").equals(req.safeEmail);
        if(duplicate[0]) return res.status(409).json({ "message": "User or email already exists" });
        const hashPwd = await bcrypt.hash(req.body.password, 10);
        const result = await User.create({
            name: req.safeName,
            email: req.safeEmail,
            password: hashPwd
        })
        console.log(result);
        setTimeout(() => {
            res.redirect('http://127.0.0.1:5500/client_side/login.html');
        }, 5000);// to simulate a delay
    } catch (error) {
        console.log(error.message);
        // res.status(403).json({ "message": "User not registered please try again" })
        res.redirect('http://127.0.0.1:5500/client_side/register.html');
    }
})


app.all('*', (req, res) => {
    console.log("This is not a proper route");
    res.status(404).json({"message": "404 Not Found"});
})

app.listen(PORT, () => {
    console.log(`Server Running on the port ${PORT}`);
})