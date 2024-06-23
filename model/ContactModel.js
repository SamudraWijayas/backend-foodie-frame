import { query } from "../database/db.js";

const Contact = {
  findAll: async () => {
    const queryStr = `
            SELECT c.id, c.email, c.phone, c.subject, c.message, c.createdAt, c.userId, u.name as userName, u.email as userEmail, u.avatar as userAvatar
            FROM contacts c
            JOIN users u ON c.userId = u.id
        `;
    try {
      return await query(queryStr);
    } catch (error) {
      throw error;
    }
  },
  findOne: async (id) => {
    const queryStr = `
            SELECT c.id, c.email, c.phone, c.subject, c.message, c.createdAt, c.userId, u.name as userName, u.email as userEmail, u.avatar as userAvatar
            FROM contacts c
            JOIN users u ON c.userId = u.id
            WHERE c.id = ?
        `;
    try {
      const results = await query(queryStr, [id]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      throw error;
    }
  },
  create: async ({ email, phone, subject, message, userId }) => {
    const queryStr =
      "INSERT INTO contacts (email, phone, subject, message, userId) VALUES (?, ?, ?, ?, ?)";
    try {
      return await query(queryStr, [email, phone, subject, message, userId]);
    } catch (error) {
      throw error;
    }
  },
  delete: async (id) => {
    const queryStr = "DELETE FROM contacts WHERE id = ?";
    try {
      return await query(queryStr, [id]);
    } catch (error) {
      throw error;
    }
  },
};

export default Contact;
