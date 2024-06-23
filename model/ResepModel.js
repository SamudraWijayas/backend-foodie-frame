import { query } from "../database/db.js";

const Resep = {
  findAll: async () => {
    const queryStr = `
            SELECT r.id, r.judul, r.deskripsi, r.bahan, r.langkah, r.linkVideo, r.gambar, r.creator, r.estimasi, r.created_at, r.kategoriId
            FROM resep r
        `;
    try {
      return await query(queryStr);
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id) => {
    const queryStr = `
            SELECT r.id, r.judul, r.deskripsi, r.bahan, r.langkah, r.linkVideo, r.gambar, r.creator, r.estimasi, r.created_at, r.kategoriId
            FROM resep r
            WHERE r.id = ?
        `;
    try {
      const results = await query(queryStr, [id]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw error;
    }
  },
  findByCategoryId: async (kategoriId) => {
    const queryStr = `
      SELECT r.id, r.judul, r.deskripsi, r.bahan, r.langkah, r.linkVideo, r.gambar, r.creator, r.estimasi, r.created_at, r.kategoriId
      FROM resep r
      WHERE r.kategoriId = ?
    `;
    try {
      return await query(queryStr, [kategoriId]);
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    judul,
    deskripsi,
    bahan,
    langkah,
    linkVideo,
    gambar,
    creator,
    estimasi,
    kategoriId,
  }) => {
    const queryStr =
      "INSERT INTO resep (judul, deskripsi, bahan, langkah, linkVideo, gambar, creator, estimasi, kategoriId, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"; // Tambahkan NOW() untuk mendapatkan tanggal dan waktu saat ini
    try {
      return await query(queryStr, [
        judul,
        deskripsi,
        bahan,
        langkah,
        linkVideo,
        gambar,
        creator,
        estimasi,
        kategoriId,
      ]);
    } catch (error) {
      throw error;
    }
  },

  update: async (
    id,
    judul,
    deskripsi,
    bahan,
    langkah,
    linkVideo,
    gambar,
    creator,
    estimasi,
    kategoriId
  ) => {
    const queryStr =
      "UPDATE resep SET judul = ?, deskripsi =?, bahan = ?, langkah = ?, linkVideo = ?, gambar = ?, creator = ?, estimasi = ?, kategoriId = ? WHERE id = ?";
    try {
      return await query(queryStr, [
        judul,
        deskripsi,
        bahan,
        langkah,
        linkVideo,
        gambar,
        creator,
        estimasi,
        kategoriId,
        id,
      ]);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    const queryStr = "DELETE FROM resep WHERE id = ?";
    try {
      return await query(queryStr, [id]);
    } catch (error) {
      throw error;
    }
  },
};

export default Resep;
