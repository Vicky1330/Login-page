import jwt from 'jsonwebtoken';

// const tokenMiddleware = async (req, res, next) => {
//   try {
//     const path = req.path;

//     // If requesting the refresh token, skip the authorization header check
//     if (path === '/api/user/refresh-token') {
//       const refreshToken = req.cookies?.refreshToken;  // Extract refresh token from cookies
//       if (!refreshToken) {
//         return res.status(403).json({ message: 'Refresh token is missing' });
//       }

//       try {
//         // Verify the refresh token
//         const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//         req.user = decoded;  // Attach user data to request
//         return next();  // Proceed to refresh token handler
//       } catch (error) {
//         return res.status(403).json({ message: 'Invalid refresh token' });
//       }
//     }

//     // For other routes, check Authorization header
//     const token = req.headers['authorization']?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Authorization token is missing' });
//     }

//     // Verify the access token
//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//       if (err) {
//         if (err.name === 'TokenExpiredError') {
//           return res.status(403).json({ message: 'Access token expired' });
//         } else {
//           return res.status(403).json({ message: 'Invalid access token' });
//         }
//       }

//       // Attach user info to request and proceed
//       req.user = decoded;
//       next();
//     });
//   } catch (error) {
//     console.error('Token Middleware Error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

const tokenMiddleware = async (req, res, next) => {
  try {
    const path = req.path;
    if (path === '/refresh-token') {
      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) {
        return res.status(403).json({ message: 'Refresh token is missing' });
      }

      try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded;
        return next();
      } catch (error) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
    }

    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(403).json({ message: 'Access token expired' });
        } else {
          return res.status(403).json({ message: 'Invalid access token' });
        }
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error('Token Middleware Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


export default tokenMiddleware;
