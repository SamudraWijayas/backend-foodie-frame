import Users from "../model/UsersModel.js";
import bcrypt from "bcryptjs"; // Menggunakan bcrypt sebagai alternatif untuk hashing password
import fs from "fs"; // Import module fs untuk manipulasi file
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getUsers1 = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUsersById = async (req, res) => {
  try {
    const response = await Users.findOne(req.params.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUsers = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password tidak cocok" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Set avatar to empty string ("") or null
    const avatar = ""; // or null

    await Users.create(name, email, hashPassword, role, avatar);

    res.status(201).json({ msg: "Tambah berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  const id = req.params.id;
  let hashPassword;
  if (password === "" || password === null) {
    const user = await Users.findOne({ where: { id } });
    hashPassword = user.password;
  } else {
    if (password !== confPassword) {
      return res.status(400).json({ msg: "Password tidak cocok" });
    }
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);
  }

  const avatar = req.file ? `/uploads/profil/${req.file.filename}` : null;

  try {
    const user = await Users.findOne(id);
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    if (avatar && user.avatar) {
      try {
        fs.unlinkSync(`.${user.avatar}`);
      } catch (err) {
        console.error("Gagal menghapus avatar lama:", err);
      }
    }

    await Users.update(
      id,
      name,
      email,
      hashPassword,
      role,
      avatar || user.avatar
    );

    // Buat token baru dengan data yang diperbarui
    const token = jwt.sign(
      { id: user.id, name, email, role, avatar: avatar || user.avatar },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({ msg: "User Updated", token });
  } catch (error) {
    if (avatar) {
      try {
        fs.unlinkSync(`.${avatar}`);
      } catch (err) {
        console.error("Gagal menghapus avatar yang diupload:", err);
      }
    }
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findOne(id);
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    // Hapus avatar terkait sebelum menghapus user
    if (user.avatar) {
      try {
        fs.unlinkSync(`.${user.avatar}`);
      } catch (err) {
        console.error("Gagal menghapus avatar:", err);
      }
    }

    await Users.delete(id);
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
