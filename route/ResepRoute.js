import express from "express";
import {
  createResep,
  getAllResep,
  getResepById,
  updateResep,
  deleteResep,
  getResepByCategoryId
} from "../controller/Resep.js";
import upload from "../middleware/UploadResep.js";

const router = express.Router();

router.post("/resep", upload.single("gambar"), createResep);
router.get("/resep", getAllResep);
router.get("/resep/:id", getResepById);
router.put("/resep/:id", upload.single("gambar"), updateResep);
router.delete("/resep/:id", deleteResep);

// Rute baru untuk mengambil resep berdasarkan kategori ID
router.get("/resep/category/:kategoriId", getResepByCategoryId);
export default router;
