import jwt from 'jsonwebtoken';

const tokenMiddleware = async (req, res, next) => {
  try {
    // Extract the token from headers or query
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    // Verify the access token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        // If the token is expired, attempt to refresh it
        if (err.name === 'TokenExpiredError') {
          const refreshToken = req.cookies?.refreshToken; // Assuming refreshToken is stored in cookies
          
          if (!refreshToken) {
            return res.status(403).json({ message: 'Refresh token is missing' });
          }

          // Attempt to refresh the access token
          try {
            const newTokens = await refreshToken(refreshToken);  // Call the refresh token function from controller
            res.setHeader('Authorization', `Bearer ${newTokens.accessToken}`);
            res.cookie('refreshToken', newTokens.refreshToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            });

            req.user = newTokens.user;  // Attach user data to request for further processing
            next(); // Move on to the next middleware/route handler
          } catch (refreshError) {
            return res.status(403).json({ message: 'Invalid refresh token' });
          }
        } else {
          return res.status(403).json({ message: 'Invalid access token' });
        }
      } else {
        // Attach user info to request and proceed
        req.user = decoded;
        next();
      }
    });
  } catch (error) {
    console.error('Token Middleware Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default tokenMiddleware;
