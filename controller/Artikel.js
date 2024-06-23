// controllers/artikelController.js
import Artikel from "../model/ArtikelModel.js";
import fs from "fs"; // Import module fs untuk manipulasi file
// import upload from "../middleware/Upload.js";

export const createArtikel = async (req, res) => {
  const { judul, content } = req.body;
  const gambar = req.file ? `/uploads/artikel/${req.file.filename}` : null; // Path yang dapat diakses oleh browser

  try {
    await Artikel.create({
      judul: judul,
      content: content,
      gambar: gambar,
      userId: req.user.id, // Menggunakan req.user.id dari middleware verifyUser
    });
    res.status(201).json({ msg: "Artikel berhasil dibuat" });
  } catch (error) {
    // Jika terjadi error, hapus gambar yang telah di-upload
    if (gambar) {
      fs.unlinkSync(`.${gambar}`);
    }
    res.status(400).json({ msg: error.message });
  }
};

export const getUserArtikel = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil id user dari req.user
    const response = await Artikel.findUserArtikels(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// semua artikel
export const getAllArtikel = async (req, res) => {
  try {
    const response = await Artikel.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getAllArtikelById = async (req, res) => {
  try {
    const artikelId = req.params.id;
    const artikel = await Artikel.findOne(artikelId);

    if (!artikel) return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Return the artikel without role checks
    return res.status(200).json(artikel);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
//

export const getArtikelById = async (req, res) => {
  try {
    const artikelId = req.params.id;
    const artikel = await Artikel.findOne(artikelId);
    if (!artikel) return res.status(404).json({ msg: "Data tidak ditemukan" });

    // Jika pengguna adalah admin, mereka bisa akses semua artikel
    if (req.user.role === "admin") {
      return res.status(200).json(artikel);
    }

    // Jika bukan admin, cek apakah pengguna adalah pemilik artikel
    if (req.user.id !== artikel.userId) {
      return res
        .status(403)
        .json({ msg: "Anda tidak memiliki izin untuk mengakses artikel ini" });
    }

    res.status(200).json(artikel);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateArtikel = async (req, res) => {
  const { id } = req.params;
  const { judul, content, userId } = req.body;
  let gambar = null;
  if (req.file) {
    gambar = req.file.path;
  }
  try {
    const artikel = await Artikel.findOne(id);
    if (!artikel)
      return res.status(404).json({ msg: "Artikel tidak ditemukan" });

    // Jika pengguna bukan admin dan bukan pemilik artikel, tolak permintaan
    if (req.user.role !== "admin" && req.user.id !== artikel.userId) {
      return res
        .status(403)
        .json({ msg: "Anda tidak memiliki izin untuk mengupdate artikel ini" });
    }

    // Hapus gambar lama jika ada
    if (gambar && artikel.gambar) {
      fs.unlinkSync(artikel.gambar);
    }

    // Update artikel dengan data baru termasuk userId dan gambar (jika ada)
    await Artikel.update(
      id,
      judul,
      content,
      gambar || artikel.gambar,
      userId || artikel.userId
    );
    res.status(200).json({ msg: "Artikel berhasil diupdate" });
  } catch (error) {
    // Jika terjadi error, hapus gambar yang telah di-upload
    if (gambar) {
      fs.unlinkSync(gambar);
    }
    res.status(400).json({ msg: error.message });
  }
};

export const deleteArtikel = async (req, res) => {
  const { id } = req.params;
  try {
    const artikel = await Artikel.findOne(id);
    if (!artikel)
      return res.status(404).json({ msg: "Artikel tidak ditemukan" });

    // Jika pengguna adalah admin, mereka bisa menghapus artikel
    if (req.user.role !== "admin" && req.user.id !== artikel.userId) {
      return res
        .status(403)
        .json({ msg: "Anda tidak memiliki izin untuk menghapus artikel ini" });
    }

    // Hapus gambar terkait sebelum menghapus artikel
    // Hapus avatar terkait sebelum menghapus user
    if (artikel.gambar) {
      try {
        fs.unlinkSync(`.${artikel.gambar}`);
      } catch (err) {
        console.error("Failed to delete gambar:", err);
      }
    }

    await Artikel.delete(id);
    res.status(200).json({ msg: "Artikel berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
