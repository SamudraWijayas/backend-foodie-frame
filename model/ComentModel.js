import { query } from "../database/db.js";

const Comment = {
    findAllByRecipe: async (resepId) => {
        const queryStr = `
            SELECT c.id, c.comment, c.resepId, c.userId, u.name as userName, u.email as userEmail, u.avatar as userAvatar
            FROM comments c
            JOIN users u ON c.userId = u.id
            WHERE c.resepId = ?
        `;
        try {
            return await query(queryStr, [resepId]);
        } catch (error) {
            throw error;
        }
    },
    create: async ({ comment, resepId, userId }) => {
        const queryStr = "INSERT INTO comments (comment, resepId, userId) VALUES (?, ?, ?)";
        try {
            return await query(queryStr, [comment, resepId, userId]);
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        const queryStr = "DELETE FROM comments WHERE id = ?";
        try {
            return await query(queryStr, [id]);
        } catch (error) {
            throw error;
        }
    }
};

export default Comment;
