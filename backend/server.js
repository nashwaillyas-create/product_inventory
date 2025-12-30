const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/inventoryDB')
.then(()=>{console.log("Connected Successfully")})
.catch((err)=>{console.log("cannot connect to mongoDB",err)})

const product = require('./models/product')

app.get('/api/product',async (req,res)=>{
    try{
    const data = await product.find();
    res.json(data);
    }catch(err){
        res.status(500).json({error:err.message})
    }
})

app.post('/api/product',async (req,res)=>{
    try{
        const data = req.body;
        const result = await product.create(data);
        res.status(201).json(result);
    }catch(err){
        res.status(400).json({error:err.message})
    }
})

app.get('/api/product/:id',async (req,res)=>{
    try{
    const pid = {_id:req.params.id};
    const data = await product.findById(pid);
    res.json(data);
    }catch(err){
    res.status(400).json({error:err.message})
    }
})

app.delete('/api/product/:id',async (req,res)=>{
    try{
    const pid = {_id:req.params.id};
    const data = await product.findByIdAndDelete(pid);
    if(!data){
        res.status(404).json({message:"Not found"})
    }
}catch(err){
    res.status(400).json({ error: err.message });
}
})

app.put('/api/product/:id',async (req,res)=>{
    try{
        const pid = req.params.id;
        const data = req.body;
        const result = await product.findByIdAndUpdate(pid,data,{ new: true });
         if (!result) return res.status(404).json({ error: "Product not found" });
            res.json(result);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
});

const port =5050
app.listen(port,()=>{
    console.log("Connected on port",port)
})