import express from "express";
import { saveFavorite, deleteFavorite, checkFavorite, getFavoritesByUser, getFavoriteCountByRecipeId } from "../controller/Favorite.js";

const router = express.Router();

router.post("/favorite", saveFavorite);
router.delete("/favorite/:userId/:resepId", deleteFavorite);
router.get("/favorite/:userId/:resepId", checkFavorite);
router.get("/favorites/:userId", getFavoritesByUser);  // Endpoint baru untuk mendapatkan daftar favorit
router.get("/favorites/count/:resepId", getFavoriteCountByRecipeId);

export default router;
