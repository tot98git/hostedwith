const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usersSchema');
const bcrypt = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function (passport) {

   passport.use(new LocalStrategy(function (username, password, done) {
        console.log("PASSWORD: ",password);
        User.findOne({'username':username},(err,user)=>{
            if(err){
                return done(null,false,{message:"Invalid username"})
            }
            if(!user){
                return done(null,false,{message:"Invalid username"})
            }
            user.validPassword(password,user.get('password'),(err,isMatch)=>{
                console.log(isMatch)
                if(err) throw err;
                if(isMatch) return done(null,user)
            })
        
        })

   passport.serializeUser(function (user, done) {
       done(null, user.id);
   });

   passport.deserializeUser(function (id, done) {
       User.findById(id,(err,user)=>{
        if(err)throw err;
        if(user) return done(null,user)
       })

   });

   }))
}