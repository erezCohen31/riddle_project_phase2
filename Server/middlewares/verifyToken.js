import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function verifyToken(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }
}

export function verifyAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized. No user data.' });
    }

    if (req.user.role !== "admin") {
        return res.status(403).json({ error: 'Access forbidden: Admins only.' });
    }

    next();
}

export function verifyUser(req, res, next) {

    if (!req.user) {
        return res.status(401).json({ error: 'Unauthorized. No user data.' });
    }

    if (req.user.role !== 'user' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access forbidden: Admins and Users only.' });
    }

    next();
}
