import { query } from "../database/db.js";

const Favorite = {
  async save(userId, resepId) {
    const sql = `
      INSERT INTO favorit (userId, resepId)
      VALUES (?, ?)
    `;
    try {
      const result = await query(sql, [userId, resepId]);
      return result;
    } catch (error) {
      throw new Error(`Error saving favorite: ${error.message}`);
    }
  },

  async delete(userId, resepId) {
    const sql = `
      DELETE FROM favorit
      WHERE userId = ? AND resepId = ?
    `;
    try {
      const result = await query(sql, [userId, resepId]);
      return result;
    } catch (error) {
      throw new Error(`Error deleting favorite: ${error.message}`);
    }
  },

  async isFavorite(userId, resepId) {
    const sql = `
      SELECT * FROM favorit
      WHERE userId = ? AND resepId = ?
    `;
    try {
      const result = await query(sql, [userId, resepId]);
      return result.length > 0;
    } catch (error) {
      throw new Error(`Error checking favorite: ${error.message}`);
    }
  },

  async getFavoritesByUser(userId) {
    const sql = `
      SELECT f.userId, f.resepId, r.* FROM favorit f
      JOIN resep r ON f.resepId = r.id
      WHERE f.userId = ?
    `;
    try {
      const result = await query(sql, [userId]);
      return result;
    } catch (error) {
      throw new Error(`Error fetching favorites: ${error.message}`);
    }
  },

  async getFavoriteCountByRecipeId(resepId) {
    const sql = `
      SELECT COUNT(*) AS count FROM favorit
      WHERE resepId = ?
    `;
    try {
      const result = await query(sql, [resepId]);
      return result[0].count;
    } catch (error) {
      throw new Error(`Error fetching favorite count: ${error.message}`);
    }
  }
};

export default Favorite;
