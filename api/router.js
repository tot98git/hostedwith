const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParse = require('body-parser');
const request = require('request-promise-native');
const provider = require('../models/providerSchema');
const settings = require('../models/settingsSchema');
const searched = require("../models/searchedSchema")
const multer = require('multer');
const path = require('path');
const loginApi = require("./login")
var upload = multer({storage:multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,path.join(__dirname,"../","/client/public/screenshots"));
    },
    filename:(req,file,cb)=>{
      cb(null,file.originalname);
    }
    })
  });
const cheerio = require('cheerio')
const fs = require('fs');
router.use("/auth",loginApi);
router.get("/url/:url",async (req,res)=>{
    let url = decodeURI(req.params.url);
    
     await request.get(`http://ip-api.com/json/${url}`,({json:true}),async (err,resp,body)=>{
        if(err) throw err;
        let name = body.isp;
        name = name.includes(', LLC')?name.replace(', LLC',''):name.includes(', INC')?name.replace(', INC',''):name.includes(".com")?name.replace(".com",''):name
        let as = body.as.split(' ')[0];
        let resObj = {
            isp:name,
            as:as,
            country:body.country,
            count:1,
            date:new Date(),
            deleted:0,
            percentage:0,
            growth:0,
            oldgrowth:0
        }
        var percentage = await provider.aggregate([{$group:{_id:null,sum:{$sum:"$count"}}},{$project:{_id:0,sum:1}}]).then((document)=>{
            if(err) throw err;
            if(document) return document[0];
        })
        searched.find({url:url},(err,docs)=>{
            if(!docs.length){
                new searched({url:url,isp:resObj.isp,date:new Date()}).save()
            }
            else{
                searched.updateOne({url:url},{$set:{date:new Date()}},(err,updated)=>{
                    if(err) return err;
                })
            }
        })
        provider.find({isp:name},async (err,docs)=>{
            if(!docs.length){
                new provider(resObj).save();
                res.json(resObj);
            }
            else{ //PROVIDER EXISTS - UPDATE THE COUNT only       
                provider.findOneAndUpdate({'isp':name},{$set:{'date':new Date()},$inc:{'count':1}},(err,updated)=>{
                    let newPercentage=(updated.count/percentage.sum) * 100;
                    let growth  = newPercentage-updated.percentage;
                    let oldgrowth = updated.growth;
                    console.log(updated);
                    docs[0]['percentage']=newPercentage;
                    docs[0]['growth']=growth;
                    docs[0]['oldgrowth']=oldgrowth
                    provider.updateOne({'_id':updated._id},{$set:{'percentage':newPercentage,'growth':growth,'oldgrowth':oldgrowth}},(err,updated)=>{
                        console.log("UPD",updated)
                    })
                    console.log("DOCS ",docs[0])
                    res.json(docs[0])
                    if (err) console.log(err);
                })
            }
        })
        .catch(err=>{return err})
    })
})
router.get('/settings',(req,res)=>{
    settings.find().exec((err,settings)=>{
        if(err) throw err;
        if(settings)res.json(settings)
    })
})
router.post('/settings',(req,res)=>{
    if(req.isAuthenticated()){
        settings.updateOne({_id:req.body._id},{headline1:req.body.headline1,headline2:req.body.headline2,soc_link_fb:req.body.soc_link_fb,soc_link_ig:req.body.soc_link_ig,soc_link_tw:req.body.soc_link_tw,copyright:req.body.copyright,mode:req.body.mode},{upsert:true},(err,upd)=>{
            if(err) return err;
            if(upd) res.json(1)
        })
    }
})
router.get('/providers',(req,res)=>{
    provider.find({deleted:0}).sort({percentage:-1}).exec((err,providers)=>{
        if(err)throw err;
        res.json(providers);
    })
})
router.get('/providers/list',(req,res)=>{
    searched.find({}).sort({date:-1}).limit(10).exec((err,providers)=>{
        console.log("PR: ",providers)
        res.json(providers)
    })
})

router.get("/providers/:id/:mode",(req,res)=>{
    if(req.params.mode=="string"){
        provider.find({'isp':req.params.id},(err,provider)=>{
            if(err) throw err;
            res.json(provider);
        })
    }
    else{
    provider.findById(req.params.id,(err,provider)=>{
        if(err) throw err;
        res.json(provider);
    })
}
})
router.get("/providers/:id",(req,res)=>{
    provider.findById(req.params.id,(err,provider)=>{
        if(err) throw err;
        res.json(provider);
    })
})
router.post('/providers',upload.single('file'),(req,res)=>{
    let {
        isp,
        desc,
        ref_link,
        id
    }=req.body
    let obj ={
        'isp':isp,
        'ref_link':ref_link,
        'desc':desc
    }
    provider.findByIdAndUpdate(id,{$set:{
       'isp':isp,
       'ref_link':ref_link,
       'desc':desc,
    }},(err,result)=>{
        if(err)throw err;
        if(result)res.json(1);
    })  
    if(obj.thumb){provider.findByIdAndUpdate(id,{$set:{
        'thumb':req.files[0].filename
    }})
}
})
router.delete('/providers/:id',(req,res)=>{
    provider.findByIdAndUpdate(req.params.id,{$set:{deleted: 1 }},(err,result)=>{
        if(err)throw err;
        if(result){console.log(result); res.json(1)}
    })
})
module.exports = router;