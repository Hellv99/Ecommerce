import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //images will be stored here
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); //appending timestamp to the original file name;
  },
});

//file filter to allow only images
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Error: File upload only supports images of type jpeg, jpg, png, gif!"
      ),
      false
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, //limit file size to 5MB
});

export const getImageUrl = (filename) => {
  return `/uploads/${filename}`;
};

export default upload;
