import { query } from "../database/db.js";

const Kategori = {
    findAll: async () => {
        const queryStr = `
            SELECT r.id, r.kategori
            FROM kategori r
        `;
        try {
            return await query(queryStr);
        } catch (error) {
            throw error;
        }
    },
    findOne: async (kategori) => {
        const queryStr = `
            SELECT r.id, r.kategori
            FROM kategori r
            WHERE r.kategori= ?
        `;
        try {
            const results = await query(queryStr, [kategori]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    },
    create: async ({ kategori}) => {
        const queryStr = "INSERT INTO kategori (kategori) VALUES (?)";
        try {
            return await query(queryStr, [kategori]);
        } catch (error) {
            throw error;
        }
    },
    update: async (id, kategori) => {
        const queryStr = "UPDATE kategori SET kategori = ? WHERE id = ?";
        try {
            return await query(queryStr, [kategori, id]);
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        const queryStr = "DELETE FROM kategori WHERE id = ?";
        try {
            return await query(queryStr, [id]);
        } catch (error) {
            throw error;
        }
    }
};

export default Kategori;
