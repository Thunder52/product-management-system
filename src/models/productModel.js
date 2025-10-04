import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    manufacturingDate:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

const Product=mongoose.model('Product',productSchema);
export default Product;