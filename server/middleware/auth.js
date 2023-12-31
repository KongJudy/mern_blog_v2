const jwt = require('jsonwebtoken');

module.exports.verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');
    if (!token) return res.status(403).send('Access Denied, No Token');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
