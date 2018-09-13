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
const path = require('path');
const login = require("./api/login");
const session = require('express-session');
const mkdirp = require('mkdirp');
const fileupload = require("express-fileupload")
const fs = require('fs');
const upPath = "./screenshots";
const FileStore = require('session-file-store')(session)



app.use(bodyParser.urlencoded({'extended':false  }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./api/passport_auth')(passport);
app.use(session({
    secret:"betweenrowsAuth"
}
))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api',api);
app.use(express.static(path.join(__dirname,'client','build')))
app.use('/public',express.static(path.join(__dirname,'/client/public')));
app.get("/*",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'client','build','index.html'));
})

mongoose.connect(uri,{useNewUrlParser:true});
mongoose.set('debug',true)


app.listen(80);
