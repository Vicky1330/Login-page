//(Routes for authentication: login, register, etc.)
import express from 'express';
import { login, refreshToken, register } from '../controllers/authController.js';
import tokenMiddleware from '../middleware/tokenMiddleware.js';


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// // Route for refreshing the access token
router.get('/refresh-token', tokenMiddleware, refreshToken);
// router.post('/logout', logout);

export {router as authRoutes};