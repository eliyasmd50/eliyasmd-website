const validator = require('validator');

const sanitizeUser = (req, res, next) => {
    if(req?.body?.name) {
       const safeName = validator.escape(req.body.name);
       req.safeName = safeName;
    }
    const safeEmail = validator.trim(validator.normalizeEmail(validator.escape(req.body.email)));
    if(!validator.isEmail(safeEmail)) return res.status(409).json({ status: "error", message : "Email entered is not a valid Email "});
    req.safeEmail = safeEmail;
    next()
}

module.exports = sanitizeUser;