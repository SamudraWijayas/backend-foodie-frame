import Users from "../model/UsersModel.js";
import jwt from "jsonwebtoken";

// export const verifyUser = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Mengambil token dari header Authorization

//   if (!token) {
//     return res
//       .status(401)
//       .json({ msg: "Token tidak tersedia, otorisasi ditolak" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     // console.log(decoded.id)
//     const user = await Users.findOne(decoded.id);
//     if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

//     req.user = user; // Tambahkan objek user ke dalam req
//     next();
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "Terjadi kesalahan pada server", error: error.message });
//   }
// };

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'Token not available, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Users.findOne(decoded.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const verifyUser1 = async (req, res, next) => {
  if (!req.session.userId) {
      return res.status(401).json({ msg: "Mohon Login ke akun anda" });
  }

  try {
      const user = await Users.findOne(req.session.userId);
      if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

      req.user = user; // Tambahkan objek user ke dalam req
      next();
  } catch (error) {
      res.status(500).json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
}

export const adminOnly = async (req, res, next) => {
  try {
    if (!req.user) return res.status(404).json({ msg: "User tidak ditemukan" });
    if (req.user.role !== "admin")
      return res.status(403).json({ msg: "Akses terlarang" });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Terjadi kesalahan pada server", error: error.message });
  }
};
