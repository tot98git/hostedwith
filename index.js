//THIS IS THE MAIN THING
const express = require("express");
const app = express();
const api = require("./api/router");
const mongoose = require('mongoose');
const passport = require('passport');
const uri = "mongodb://localhost:27017/hostedwith"
const provider = require('./models/providerSchema');
const searched = require("./models/searchedSchema")
const settings = require("./models/settingsSchema")
const bodyParser = require("body-parser");
const login = require("./api/login");
const session = require('express-session');
const FileStore = require('session-file-store')(session)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));


require('./api/passport_auth')(passport);

app.use(session({
    secret:"betweenrowsAuth"
}
))
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth",login);
mongoose.connect(uri,{useNewUrlParser:true});
mongoose.set('debug',true)
app.get("/settings",(req,res)=>{
        settings.find().exec((err,settings)=>{
            if(err) throw err;
            if(settings)res.json(settings)
        })
})
app.post('/settings',(req,res)=>{
    if(req.isAuthenticated()){
        settings.updateOne({_id:req.body._id},{headline1:req.body.headline1,headline2:req.body.headline2,soc_link_fb:req.body.soc_link_fb,soc_link_ig:req.body.soc_link_ig,soc_link_tw:req.body.soc_link_tw,copyright:req.body.copyright,mode:req.body.mode},{upsert:true},(err,upd)=>{
            if(err) return err;
            if(upd) res.json(1)
        })
    }
})
app.get("/providers/",(req,res)=>{
    provider.find({deleted:0},(err,providers)=>{
        if(err)throw err;
        res.json(providers);
    })
})
app.get("/providers/list",(req,res)=>{
    searched.find({}).sort({date:-1}).limit(10).exec((err,providers)=>{
        console.log("PR: ",providers)
        res.json(providers)
    })
})

app.get("/providers/:id",(req,res)=>{
    provider.findById(req.params.id,(err,provider)=>{
        if(err) throw err;
        res.json(provider);
    })
})
app.post("/providers",(req,res)=>{
    let obj=req.body.values;
    console.log(obj)
    provider.findByIdAndUpdate(req.body.id,{$set:{
        'isp':obj.isp,
        'ref_link':obj.ref_link,
        'desc':obj.desc
    }},(err,result)=>{
        if(err)throw err;
        if(result)res.json(1);
    })
})
app.use('/url',api);
app.delete("/providers/:id",(req,res)=>{
    console.log(req.params.id);
    provider.findByIdAndUpdate(req.params.id,{$set:{deleted: 1 }},(err,result)=>{
        if(err)throw err;
        if(result){console.log(result); res.json(1)}
    })
})     

app.listen(5000);
