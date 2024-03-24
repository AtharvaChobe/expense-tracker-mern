import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose'
import {transactionModel} from './models/transaction.js'


const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test',(req,res)=>{
    res.json('test ok');
})

app.post('/api/transaction',async(req,res)=>{
    // console.log(process.env.VITE_MONGO_URL)
    await mongoose.connect(process.env.VITE_MONGO_URL)
    const {price,name,desc,dateTime} = req.body;
    const t = await transactionModel.create({price,name,desc,dateTime})
    res.json(t);
})

app.get('/api/all-transactions',async(req,res)=>{
    await mongoose.connect(process.env.VITE_MONGO_URL)
    const result = await transactionModel.find();
    res.json(result);

})

app.listen(4000);