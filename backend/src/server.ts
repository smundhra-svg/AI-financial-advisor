import express from 'express';
import dotenv from 'dotenv';

import testConnection from './config/db-test.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/health',(_,res)=>{
    res.status(200).json({message: 'API is working'});
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    testConnection();
});
