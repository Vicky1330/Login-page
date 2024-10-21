import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

// Generate tokens (access and refresh)
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  const newRefreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, newRefreshToken };
};
// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); 
    res.status(200).json({ accessToken }); 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
// Refresh the access token
// const refreshToken = (req, res) => {
//   const user = req.user; // Decoded from tokenMiddleware
//   const { accessToken } = generateTokens(user);
//   res.json({ accessToken }); // Return new access token
// };

const refreshToken = async (refreshToken) => {
  // Verify the refresh token
  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

  // Fetch user information based on the decoded refresh token
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new Error('Invalid refresh token');
  }

  // Generate new tokens
  const { accessToken, newRefreshToken } = generateTokens(user);

  return { accessToken, refreshToken: newRefreshToken, user };
};


export {
  register,
  login,
  refreshToken,
  // logout
};


// // Logout user
// exports.logout = (req, res) => {
//   res.clearCookie('refreshToken'); // Clear the refresh token cookie
//   res.json({ message: 'Logged out successfully' });
// };
