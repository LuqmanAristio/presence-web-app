import jwt from 'jsonwebtoken';

export default function getAdmin(req, res, next) {
    try {
        const adminToken = req.headers['authorization'].split(' ').at(-1);
        const admin = jwt.verify(adminToken, process.env.JWT_SECRET);
        if(!admin) return res.status(401).json({message: 'Token is not a valid JWT or not a valid user', error: 'Invalid token'});
        req.admin = admin;
        next();
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({message: 'Server token error', error: err.message});
    }
}