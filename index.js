import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection } from "./database/db.js";
import router from "./route/index.js";
import multer from "multer";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/";
    if (req.path.includes("/uploadArticleImage")) {
      uploadPath += "artikel/";
    } else if (req.path.includes("/uploadRecipeImage")) {
      uploadPath += "resep/";
    } else if (req.path.includes("/users")) {
      uploadPath += "profil/";
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

app.use(
  cors({
    origin: "https://foodieframe.vercel.app", // Atur origin frontend Anda di sini
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads"))); // Menyajikan folder uploads secara statis

// Middleware untuk memverifikasi token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(403)
      .json({ message: "Token tidak tersedia, akses ditolak." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("Error verifying token:", err);
      return res.status(401).json({ message: "Token tidak valid." });
    }
    req.userId = decoded.userId; // Menyimpan userId ke dalam request untuk digunakan di handler selanjutnya
    next();
  });
};

app.use(verifyToken); // Gunakan middleware untuk semua route di bawah ini

app.use(router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ msg: "Terjadi kesalahan pada server", error: err.message });
});

app.listen(process.env.APP_PORT, () => {
  testConnection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
