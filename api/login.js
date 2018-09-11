const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser')
const user = require("../models/usersSchema");
const bcrypt = require('bcrypt')
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

router.post('/credentials',passport.authenticate('local'),(req,res)=>{
    console.log(req.body)
    const {
        username,
        password,
        newusername,
        newpassword
    }=req.body
    if((newusername!=""&&!newusername.includes(" "))&&(newpassword!=""&&!newpassword.includes(" "))){
        let newPassword = bcrypt.hashSync(newpassword,10);
        user.updateOne({"username":username},{$set:{"username":newusername,"password":newPassword}},(err,updated)=>{
            if(updated)res.json(1)
        });
    }
    else if((newusername!=""&&!newusername.includes(" "))&&(newpassword=="")){
        user.updateOne({"username":username},{$set:{"username":newusername}},(err,updated)=>{
            if(updated)res.json(1)

        });
    }
    else if((newusername=="")&&(newpassword!=""&&!newpassword.includes(" "))){
        let newPassword = bcrypt.hashSync(newpassword,10);
        user.updateOne({"username":username},{$set:{"password":newPassword}},(err,updated)=>{
            if(updated)res.json(1)
        });
    }
    else{
        res.json(0)
    }
})
module.exports=router;