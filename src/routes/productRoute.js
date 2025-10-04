import express from 'express'
import {authenticate,authorize} from '../middleware/authMiddleware.js'
import {addProduct,getProduct,getUpdateProduct,updateProduct,deleteProduct} from '../controller/productController.js'
import upload from '../config/upload.js';

const router=express.Router();

router.get('/create',authenticate,authorize,(req,res)=>{
    const role=req.role;
    return res.render('createProduct.ejs',{role});
})
router.get('/home',authenticate,getProduct)
router.post('/create',authenticate,authorize,upload.single('image'),addProduct);
router.get('/edit',authenticate,authorize,getUpdateProduct);
router.post('/edit/:id',authenticate,authorize,upload.single('image'),updateProduct)
router.get('/delete/:id',authenticate,authorize,deleteProduct)
export default router;
