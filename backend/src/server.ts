import express from 'express';
import dotenv from 'dotenv';
import cors from "cors"
import connectDB from './config/db-test.js';
import uploadRouter from './routes/upload.routes.ts';
import aiRouter from './routes/ai.route.ts';
import { connectMongoDB } from './config/mongoodbConfig.ts';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(uploadRouter)
app.use(aiRouter);

app.get('/health',(_,res)=>{
    res.status(200).json({message: 'API is working'});
});

const startServer = async () => {
  await connectMongoDB(); // 🔴 THIS WAS MISSING OR NOT AWAITED

  app.listen(3000, () => {
    console.log(`🚀 Server running on port 3000`);
  });
};

startServer();
