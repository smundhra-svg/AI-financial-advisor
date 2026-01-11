import { type Request } from "express";
import path from "node:path";

export const validateFile = (req:Request, file: Express.Multer.File,cb:any)=>{
    const allowedMimeTypes = ['text/csv','application/pdf'];
    const allowedMimeExtensions = ['.csv','.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if(allowedMimeTypes.includes(file.mimetype) || !allowedMimeExtensions.includes(ext)) {
        cb(null,true)
    } else {
        cb(new Error(`Invalid file type. Only CSV and PDF files are allowed.`));
    }
}