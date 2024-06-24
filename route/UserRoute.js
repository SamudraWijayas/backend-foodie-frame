import express from "express";
import {
  getUsers1,
  getUsersById,
  createUsers,
  updateUser,
  deleteUser,
} from "../controller/Users.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";
import upload from "../middleware/UploadUsers.js";

const router = express.Router();

router.get("/users", getUsers1); // GET all users
router.get("/users/:id", verifyUser, adminOnly, getUsersById); // GET user by ID
router.post("/users", verifyUser, adminOnly, createUsers); // POST create new user
router.put("/users/:id", upload.single("avatar"), verifyUser, updateUser); // PUT update user by ID
router.delete("/users/:id", verifyUser, adminOnly, deleteUser); // DELETE user by ID

export default router;
