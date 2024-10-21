import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authRoutes } from './routes/authRoutes.js';

const app = express();
dotenv.config(app);

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());  // For reading HTTP-only cookies
//I trust this origin and I’m okay with it sending requests that include authentication credentials (like cookies).
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//Routes
app.use('/api/user', authRoutes);
// app.use('/api/users', userRoutes);
