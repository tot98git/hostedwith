const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser')
router.get("/",(req,res)=>{
    if(req.isAuthenticated()){
        console.log("logged in");
        res.json(1)
    }
    else{
        res.json(0)
    }
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.json(1)
})

router.post("/",passport.authenticate('local'),(req,res)=>{
    res.json(1)
})



module.exports=router;