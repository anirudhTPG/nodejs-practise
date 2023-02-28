import express from 'express';
import multer from "multer";

import controller from "../controllers/S3";
import { multerConfig } from "../config/multerConfig";

const router = express.Router();

const upload = multer(multerConfig);

router.post("/upload", upload.single('upload_file'), controller.uploadToS3Bucket);

export = router;

