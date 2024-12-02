const ConnectDB = require('../controllers/connectDB');
const connectDB = new ConnectDB();
const bcrypt = require('bcrypt');

const authenticateUser = async (req, res, next) => {
    const result = await connectDB.loginUser({ "email": req.safeEmail})
    if(!result[0]) return res.status(403).json({ message: "Email not registsered" });
    const pwdCheck = await bcrypt.compare(req.body.password, result[0].password);
    if(!pwdCheck) return res.status(401).json({ message: "Password not matched" });
    console.log(`User loggged in name : ${JSON.stringify(result[0].name)}`);
    next();
}

module.exports = authenticateUser;