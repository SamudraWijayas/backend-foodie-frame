import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Mengambil token dari header Authorization

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Token tidak tersedia, otorisasi ditolak" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ msg: "Token kedaluwarsa, silakan login kembali" });
    }
    return res.status(403).json({ msg: "Token tidak valid" });
  }
};
