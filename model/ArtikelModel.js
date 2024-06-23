
import { query } from "../database/db.js";

const Artikel = {
    findAll: async () => {
        const queryStr = `
            SELECT a.id, a.judul, a.content, a.gambar, a.userId, u.name as userName, u.email as userEmail 
            FROM artikel a
            JOIN users u ON a.userId = u.id
        `;
        try {
            return await query(queryStr);
        } catch (error) {
            throw error;
        }
    },
    findOne: async (id) => {
        const queryStr = `
            SELECT a.id, a.judul, a.content, a.gambar, a.userId, u.name as userName, u.email as userEmail 
            FROM artikel a
            JOIN users u ON a.userId = u.id
            WHERE a.id = ?
        `;
        try {
            const results = await query(queryStr, [id]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    },
    create: async ({ judul, content, gambar, userId }) => {
        const queryStr = "INSERT INTO artikel (judul, content, gambar, userId) VALUES (?, ?, ?, ?)";
        try {
            return await query(queryStr, [judul, content, gambar, userId]);
        } catch (error) {
            throw error;
        }
    },
    update: async (id, judul, content, gambar, userId) => {
        const queryStr = "UPDATE artikel SET judul = ?, content = ?, gambar = ?, userId = ? WHERE id = ?";
        try {
            return await query(queryStr, [judul, content, gambar, userId, id]);
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        const queryStr = "DELETE FROM artikel WHERE id = ?";
        try {
            return await query(queryStr, [id]);
        } catch (error) {
            throw error;
        }
    },
    findUserArtikels: async (userId) => {
        const queryStr = `
            SELECT a.id, a.judul, a.content, a.gambar, a.userId, u.name as userName, u.email as userEmail 
            FROM artikel a
            JOIN users u ON a.userId = u.id
            WHERE a.userId = ?
        `;
        try {
            return await query(queryStr, [userId]);
        } catch (error) {
            throw error;
        }
    }
};

export default Artikel;
