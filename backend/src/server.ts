import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from './config/db-test.js';
import uploadRouter from './routes/upload.routes.ts';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(uploadRouter)

app.get('/health',(_,res)=>{
    res.status(200).json({message: 'API is working'});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB();
});
