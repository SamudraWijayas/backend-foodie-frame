// Import modul yang diperlukan
import express from "express";
import { Login, logout, Register } from "../controller/Auth.js";
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Gunakan POST untuk operasi login
// router.get("/me", Me);
router.post("/login", Login);
router.delete("/logout", logout);
router.post("/register", Register); // Tambahkan ini untuk registrasi
router.get('/me', verifyToken, (req, res) => {
  res.status(200).json(req.user); // req.user contains decoded user information
});


export default router;
