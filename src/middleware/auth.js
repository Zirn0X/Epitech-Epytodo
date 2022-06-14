const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = (req, res, next) => {
    const auth = req.headers.authorization;

    jwt.verify(auth, process.env.SECRET, { expiresIn:"1h"},(err, decoded) =>  {
        if (err) {
            res.status(401).send({"msg":"No token, authorization denied"});
        } else {
            next();
        }
    })
}