import express from 'express'
import {loginController, registerController} from '../controller/authController.js'
const router=express.Router();

router.get('/login',(req,res)=>{
    return res.render('login.ejs');
})
router.get('/register',(req,res)=>{
    return res.render('register.ejs');
})
router.post('/register',registerController);
router.post('/login',loginController);
router.get('/',(req,res)=>{
   res.render('login.ejs'); 
})


export default router;