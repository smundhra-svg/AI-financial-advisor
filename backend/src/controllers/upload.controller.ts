import { processFile } from "../services/upload.service.ts";
import { type Request, type Response } from "express";

export const uploadFile = async (req:Request, res: Response)=> {
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"});
    }
    const result = await processFile(req.file);
    res.json({message: "File processed successfully", data: result});
}