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
  const refreshToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
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
  console.log(refreshToken, " ", accessToken);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); 
    res.status(200).json({ accessToken,refreshToken, message: "Login successful", }); 
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const refreshTokenHandler = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
console.log(`Refreshing token: ${refreshToken}`);
  if (!refreshToken) {
    return res.status(403).json({ message: 'Refresh token is missing' });
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(403).json({ message: 'User not found' });

    // Generate new access and refresh tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set the new refresh token in the cookies
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Set to false for localhost
      maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
};






export {
  register,
  login,
  refreshTokenHandler,
  // logout
};

