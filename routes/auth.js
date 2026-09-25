const express=require('express');
const router=express.Router();
const {logIn,signIn,logOut}=require('../controllers/auth')
router.post('/login',logIn);
router.post('/signin',signIn);
router.post('/logout',logOut);
module.exports=router;
