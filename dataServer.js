import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoDB from './src/utils/mongodb.js';
import authRoutes from './src/routes/auth.routes.js';
import UserRoutes from './src/routes/user.routes.js';
import { verifyAccessToken } from './src/utils/jwt.js';
import User from './src/models/user.model.js';
import mongoose from "mongoose";
dotenv.config()

const port = 8001;
const app = express();

const DishShema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    user_id: String
},{timestamps:true})

const Dish = mongoose.model('Dish', DishShema)
const newDish = Dish.create({
    name: "Pasta",
    description: "Delicious pasta with tomato sauce",
    price: 12.99,
    user_id: "692605187a2a372e2b291f93"
})
app.get('/api/data', (req, res) => {
    res.json({ message: 'Data from data server' });
})


app.get('/api/data/user', async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const isVerifiedToken = verifyAccessToken(token);
    if(!isVerifiedToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const user = await User.findOne({ _id: isVerifiedToken.id }).select('-password');
    if(!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if(user._id.toString() !== isVerifiedToken.id) {
        return res.status(403).json({ message: 'Forbidden' });
    }
    const dishes = await Dish.find({
         user_id: user._id 
    });
    res.status(200).json({
        dishes
    })
})
mongoDB();
app.listen(port, () => {
    console.log(`Data Server is running on port http://localhost:${port}`);
})