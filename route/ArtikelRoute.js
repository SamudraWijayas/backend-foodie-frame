import express from "express";
import {
  createArtikel,
  getAllArtikel,
  getUserArtikel,
  getArtikelById,
  getAllArtikelById,
  updateArtikel,
  deleteArtikel,
} from "../controller/Artikel.js";
import { verifyUser } from "../middleware/AuthUser.js";
import upload from "../middleware/UploadArtikel.js";

const router = express.Router();

router.post("/artikel", verifyUser, upload.single("gambar"), createArtikel);
router.get("/artikel", verifyUser, getUserArtikel);
router.get("/artikel/:id", verifyUser, getArtikelById);
router.put("/artikel/:id", verifyUser, upload.single("gambar"), updateArtikel);
router.delete("/artikel/:id", verifyUser, deleteArtikel);
// semua
router.get("/artikel-all", getAllArtikel);
router.get("/artikel-all/:id", getAllArtikelById);
export default router;
