const express = require('express');
const router=express.Router();
router.get('/', (req, res)=>{
   console.log("connected successfully")
});
module.exports = router;
