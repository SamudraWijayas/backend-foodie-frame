import { query } from "../database/db.js";

const Users = {
    findAll: async () => {
        const queryStr = "SELECT id, name, email, role, avatar FROM users";
        try {
            return await query(queryStr);
        } catch (error) {
            throw error;
        }
    },
    findOne: async (id) => {
        const queryStr = "SELECT id, name, email, role, avatar FROM users WHERE id = ?";
        try {
            const results = await query(queryStr, [id]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    },
    findByEmail: async (email) => {
        const queryStr = "SELECT * FROM users WHERE email = ?";
        try {
            const results = await query(queryStr, [email]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw error;
        }
    },
    create: async (name, email, password, role) => {
        const queryStr = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
        try {
            return await query(queryStr, [name, email, password, role]);
        } catch (error) {
            throw error;
        }
    },
    update: async (id, name, email, password, role, avatar = null) => {
        // console.log(name)
        const queryStr = avatar 
            ? "UPDATE users SET name = ?, email = ?, password = ?, role = ?, avatar = ? WHERE id = ?" 
            : "UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?";
        const values = avatar 
            ? [name, email, password, role, avatar, id] 
            : [name, email, password, role, id];
        try {
            return await query(queryStr, values);
        } catch (error) {
            throw error;
        }
    },
    delete: async (id) => {
        const queryStr = "DELETE FROM users WHERE id = ?";
        try {
            return await query(queryStr, [id]);
        } catch (error) {
            throw error;
        }
    }
};

export default Users;
