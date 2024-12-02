const ConnectDB = require('../../controllers/connectDB');
const dbConnect = new ConnectDB();

const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const duplicateUser = await dbConnect.checkDuplicateUser({ "email": req.body.email});
        if(duplicateUser[0]) return res.status(409).json({ message: "Email already exist"});
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        const document = {
            "name": req.safeName,
            "email": req.safeEmail,
            "password": hashedPwd,
            "createdAt": Date.now(),
            "updatedAt": Date.now()
        }
        const result = await dbConnect.createUser(document);
        return res.json({ message: "Successfully created", data: result});
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

module.exports = createUser;
