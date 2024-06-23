import Resep from "../model/ResepModel.js";
import fs from "fs"; // Import module fs untuk manipulasi file

export const createResep = async (req, res) => {
  const {
    judul,
    bahan,
    deskripsi,
    langkah,
    linkVideo,
    creator,
    estimasi,
    kategoriId,
  } = req.body;
  const gambar = req.file ? `/uploads/resep/${req.file.filename}` : null; // Path yang dapat diakses oleh browser

  try {
    const createdAt = new Date(); // Tanggal dan waktu saat ini
    await Resep.create({
      judul: judul,
      bahan: bahan,
      deskripsi: deskripsi,
      langkah: langkah,
      linkVideo: linkVideo,
      gambar: gambar,
      creator: creator,
      estimasi: estimasi, // Pastikan estimasi disertakan
      kategoriId: kategoriId,
      created_at: createdAt, // Menambahkan nilai created_at
    });
    res.status(201).json({ msg: "Resep berhasil dibuat" });
  } catch (error) {
    // Jika terjadi error, hapus gambar yang telah di-upload
    if (gambar) {
      fs.unlinkSync(`.${gambar}`);
    }
    res.status(400).json({ msg: error.message });
  }
};

export const getAllResep = async (req, res) => {
  try {
    const response = await Resep.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getResepById = async (req, res) => {
  try {
    const resepId = req.params.id;
    const resep = await Resep.findOne(resepId);
    if (!resep) return res.status(404).json({ msg: "Data tidak ditemukan" });

    res.status(200).json(resep);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateResep = async (req, res) => {
  const { id } = req.params;
  const {
    judul,
    bahan,
    deskripsi,
    langkah,
    linkVideo,
    creator,
    estimasi,
    kategoriId,
  } = req.body;
  let gambar = null;
  if (req.file) {
    gambar = req.file.path;
  }
  try {
    const resep = await Resep.findOne(id);
    if (!resep) return res.status(404).json({ msg: "Resep tidak ditemukan" });

    // Hapus gambar lama jika ada
    if (gambar && resep.gambar) {
      fs.unlinkSync(resep.gambar);
    }

    // Update resep dengan data baru termasuk gambar (jika ada)
    await Resep.update(
      id,
      judul,
      deskripsi,
      bahan,
      langkah,
      linkVideo,
      creator,
      estimasi,
      gambar || resep.gambar,
      kategoriId
    );
    res.status(200).json({ msg: "Resep berhasil diupdate" });
  } catch (error) {
    // Jika terjadi error, hapus gambar yang telah di-upload
    if (gambar) {
      fs.unlinkSync(gambar);
    }
    res.status(400).json({ msg: error.message });
  }
};

export const deleteResep = async (req, res) => {
  const { id } = req.params;
  try {
    const resep = await Resep.findOne(id);
    if (!resep) return res.status(404).json({ msg: "Resep tidak ditemukan" });

    // Hapus gambar terkait sebelum menghapus resep
    if (resep.gambar) {
      try {
        fs.unlinkSync(`.${resep.gambar}`);
      } catch (err) {
        console.error("Failed to delete gambar:", err);
      }
    }

    await Resep.delete(id);
    res.status(200).json({ msg: "Resep berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getResepByCategoryId = async (req, res) => {
  const { kategoriId } = req.params;
  try {
    const resepByCategory = await Resep.findByCategoryId(kategoriId);
    res.status(200).json(resepByCategory);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
