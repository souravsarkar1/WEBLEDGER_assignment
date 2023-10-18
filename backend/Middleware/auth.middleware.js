const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = (req, res, next) => {

    
    const token = req.headers.authorization?.split(' ')[1];
  //  console.log(token);
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.secrate);
            req.body.chefeName = decode.name;
            req.body.chefeId = decode.userId;
            next();
        } catch (error) {
            return res.status(401).json({ msg: "Not Authorized" });
        }
    } else {
        return res.status(401).json({ msg: "Please login" });
    }
};

module.exports = { auth };
