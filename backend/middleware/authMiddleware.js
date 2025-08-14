const jwt = require('jsonwebtoken');

const authMiddleWare = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ message: 'no token, authorization denied'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch(err) {
        console.error(error);
        res.status(401).json({message: 'token is not valid'});
    }
};

module.exports = authMiddleWare;