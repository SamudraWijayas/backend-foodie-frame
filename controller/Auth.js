import argon2 from "argon2";
import jwt from "jsonwebtoken";
import Users from "../model/UsersModel.js";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY; // Menggunakan secret key dari .env

export const Login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: "Email dan password harus diisi" });
  }

  try {
    const user = await Users.findByEmail(email);
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan" });
    }

    const match = await argon2.verify(user.password, password);
    if (!match) {
      return res.status(400).json({ msg: "Password salah" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      SECRET_KEY,
      { expiresIn: "2h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const logout = (req, res) => {
  // Secara umum, JWT tidak memerlukan logout karena token yang diterbitkan memiliki masa berlaku (expiration time).
  // Pengguna dapat "logout" dengan cara menghapus token dari client-side (misalnya, dengan menghapus dari localStorage).

  res.status(200).json({ msg: "Anda telah logout" });
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;

  if (password !== confPassword) {
    return res.status(400).json({ msg: "Password tidak cocok" });
  }

  try {
    const existingUser = await Users.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "Email sudah digunakan" });
    }

    const hashPassword = await argon2.hash(password);
    const role = "user"; // Set role default sebagai user
    await Users.create(name, email, hashPassword, role);
    res.status(201).json({ msg: "Registrasi berhasil" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};
