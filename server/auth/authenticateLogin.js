const validator = require('validator');
const User = require('../model/User');
const bcrypt = require('bcrypt');

async function authenticateLogin (req, res, next) {
    try {
        const user = await User.find({ email: req.safeEmail });
        console.log(user);
        if(!user[0]) return res.status(401).json({ status: "error", message: "user not found" });
        const pwd = await bcrypt.compare(req.body.password, user[0].password);
        if(!pwd) return res.status(401).json({ status: "error", message: "password not match" });
        next();
    } catch (error) {
        console.log(error.message);
        // res.status(401).json({ "message": "Uauthorized user" });
        res.redirect('http://127.0.0.1:5500/client_side/login.html');
    }
}

module.exports = authenticateLogin;