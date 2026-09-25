const express=require('express');
const router=express.Router();
const {addReview,modifingReview,deleteTheReview}=require('../controllers/book').authenticated;
router.post('/:ISBN',addReview);
router.put('/:ISBN',modifingReview)
router.delete('/:ISBN',deleteTheReview)
module.exports=router;