import express from 'express';
import { registerUser, loginUser, logoutUser, updateApiKey } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.put('/update-api', updateApiKey);

export default router;
