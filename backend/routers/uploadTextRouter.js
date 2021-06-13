import multer from 'multer';
import express from 'express';
import path from 'path';

const uploadTextRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/');
    cb(null, 'frontend/public/src/');
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

uploadTextRouter.post('/', upload.single('textfile'), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default uploadTextRouter;  