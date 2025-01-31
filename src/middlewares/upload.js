import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop(); // Get the file extension
    const uniqueSuffix = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = function (req, file, cb) {
  const types = ["image/jpeg", "image/png"];
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
});
