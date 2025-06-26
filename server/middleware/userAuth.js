import jwt from 'jsonwebtoken';

const userAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Login Again' });
    }

    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (!tokenDecode || !tokenDecode.id) {
      return res.status(401).json({ success: false, message: 'Invalid Token. Login Again' });
    }

    req.user = { id: tokenDecode.id }; 

    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Authentication failed', error: error.message });
  }
};

export default userAuth;
