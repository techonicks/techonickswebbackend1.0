import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/uploads/content/");
  },
  filename: function (req, file, cb) {
    cb(null, "temp.jpg");
  },
});

export const upload = multer({ storage: storage });