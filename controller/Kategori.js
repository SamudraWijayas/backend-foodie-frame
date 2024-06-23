import Kategori from "../model/KategoriModel.js";

export const createKategori = async (req, res) => {
    const { kategori } = req.body;
    try {
        await Kategori.create({
            kategori: kategori
        });
        res.status(201).json({ msg: "Kategori berhasil dibuat" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};
// export const createKategori1 = async (req, res) => {
//     const { kategori } = req.body;

//     // Validasi input
//     if (!kategori) {
//         return res.status(400).json({ msg: "Kategori tidak boleh kosong" });
//     }

//     try {
//         // Pembuatan kategori baru
//         await Kategori.create({ kategori });
//         res.status(201).json({ msg: "Kategori berhasil dibuat" });
//     } catch (error) {
//         // Tangani kesalahan dari operasi database
//         res.status(500).json({ msg: error.message });
//     }
// };

export const getAllKategori = async (req, res) => {
    try {
        const response = await Kategori.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getKategoriById = async (req, res) => {
    try {
        const kategoriName = req.params.kategori;
        const kategori = await Kategori.findOne(kategoriName);
        if (!kategori) return res.status(404).json({ msg: "Data tidak ditemukan" });

        res.status(200).json(kategori);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updateKategori = async (req, res) => {
    const { id } = req.params;
    const { kategori } = req.body;
    try {
        const kate = await Kategori.findOne(id);
        if (!kate) return res.status(404).json({ msg: "Kategori tidak ditemukan" });

        // Update resep dengan data baru termasuk gambar (jika ada)
        await Kategori.update(id, kategori);
        res.status(200).json({ msg: "Kategori berhasil diupdate" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};

export const deleteKategori = async (req, res) => {
    const { id } = req.params;
    try {
        const kategori = await Kategori.findOne(id);
        if (!kategori) return res.status(404).json({ msg: "Kategori tidak ditemukan" });

        await Kategori.delete(id);
        res.status(200).json({ msg: "Kategori berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
