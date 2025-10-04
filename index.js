import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js'
import productRoute from './src/routes/productRoute.js'

dotenv.config();
const app=express();
connectDB();

app.set("view engine","ejs");
app.use(express.json({limit:'5mb'}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true,limit:'5mb' })); 
app.use(express.static("public"));
app.use(authRoutes);
app.use(productRoute);

app.listen(3000,()=>{
    console.log('Server is listening on port 3000');
})