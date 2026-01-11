import { Router } from "express";
import multer from "multer";
import { validateFile } from "../utils/fileValidator.ts";
import { uploadFile } from "../controllers/upload.controller.ts";

const uploadRouter = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: validateFile,
});

uploadRouter.post("/upload",upload.single("file"),uploadFile);

export default uploadRouter;