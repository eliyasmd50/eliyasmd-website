const jwt = require('jsonwebtoken');

async function authorizeUser  (req, res, next) {
    const payload = {
        email: req.body.email//need to change it to safeEmail
    }
    try {
        const accessToken =  await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET)
        console.log({ accessToken : accessToken });
        next();
    } catch (error) {
        console.log("error in authgorize" + error.message)
        res.send(400).json({"message": error.message});
    }
   
}

module.exports = authorizeUser;