import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Menentukan folder penyimpanan file
    cb(null, 'uploads/artikel');
  },
  filename: (req, file, cb) => {
    // Menentukan nama file saat diunggah
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Fungsi untuk memfilter tipe file yang diizinkan
const fileFilter = (req, file, cb) => {
  // Tentukan jenis file yang diizinkan
  const allowedFileTypes = /jpeg|jpg|png/;
  // Periksa apakah tipe MIME dan ekstensi file sesuai dengan yang diizinkan
  const mimeTypeMatch = allowedFileTypes.test(file.mimetype);
  const extNameMatch = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  // Jika keduanya sesuai, lanjutkan dengan mengizinkan unggahan
  if (mimeTypeMatch && extNameMatch) {
    return cb(null, true);
  }
  // Jika tidak sesuai, kirimkan pesan kesalahan
  cb(new Error('Hanya file dengan tipe .jpeg, .jpg, dan .png yang diizinkan!'));
};

// Konfigurasi multer dengan opsi yang telah ditentukan
const upload = multer({
  storage: storage, // Gunakan konfigurasi penyimpanan yang telah ditentukan
  fileFilter: fileFilter, // Gunakan fungsi filter tipe file yang telah ditentukan
  limits: { fileSize: 1024 * 1024 * 5 } // Batasan ukuran file (5 MB)
});

export default upload;
