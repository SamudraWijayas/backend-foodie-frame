import express from "express";
import {
  createKategori,
  getAllKategori,
  getKategoriById,
  updateKategori,
  deleteKategori,
} from "../controller/Kategori.js";

const router = express.Router();

router.post("/kategori", createKategori);
router.get("/kategori", getAllKategori);
router.get("/kategori/:kategori", getKategoriById);
router.put("/kategori/:id", updateKategori);
router.delete("/kategori/:id", deleteKategori);
export default router;
