var jwt = require('jsonwebtoken');

const JWT_SECRET = 'Leoisagoodb$oy';

const fetchuser = (req, res, next) => {
  // Get the user from JWT Token and add the id to req object
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user; // Attach user data to the request object
  } catch (error) {
    return res.status(401).json({ error: 'Please authenticate using a valid token' });
  }

  // Call next() only if everything is valid
  next();
};

module.exports = fetchuser;
