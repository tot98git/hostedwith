const express = require('express');
const router = express.Router();
const request = require('request-promise-native');
const provider = require('../models/providerSchema');
const searched = require("../models/searchedSchema")
const cheerio = require('cheerio')
const fs = require('fs');

router.get("/:url",async (req,res)=>{
    let url = decodeURI(req.params.url);
    
     await request.get(`http://ip-api.com/json/${url}`,({json:true}),(err,resp,body)=>{
        if(err) throw err;
        let name = body.isp;
        name = name.includes(', LLC')?name.replace(', LLC',''):name.includes(', INC')?name.replace(', INC',''):name.includes(".com")?name.replace(".com",''):name
        let as = body.as.split(' ')[0];
        let resObj = {
            isp:name,
            as:as,
            country:body.country,
            count:1,
            date:new Date()
        }
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
                provider.updateOne({'isp':name},{$set:{'date':new Date()},$inc:{'count':1}},(err,updated)=>{
                    res.json(docs[0])
                    if (err) console.log(err);
                })
            }
        })
        .catch(err=>{return err})
    })
})


module.exports = router;