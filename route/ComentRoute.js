import express from "express";
import { getCommentsByRecipe, addComment, deleteComment } from "../controller/Coment.js";

const router = express.Router();

router.get("/comments/:resepId", getCommentsByRecipe);
router.post("/comments", addComment);
router.delete("/comments/:id", deleteComment);

export default router;
