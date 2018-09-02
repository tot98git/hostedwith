const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/usersSchema');

// expose this function to our app using module.exports
module.exports = function (passport) {

   passport.use(new LocalStrategy(function (username, password, done) {

        console.log("username",username," ",password)
        User.findOne({'username':username},(err,user)=>{
            if(err){
                return done(null,false,{message:"Invalid username"})
            }
            if(!user){
                return done(null,false,{message:"Invalid password"})
            }
            else if(user){
                User.findOne({'username':username,'password':password},(err,user)=>{
                    if(!user)return done(null,false,{message:"Invalid password"})
                    if(user)return done(null,user)
                })
            }
        })

   passport.serializeUser(function (user, done) {
       done(null, user.id);
   });

   passport.deserializeUser(function (id, done) {
       User.findById(id,(err,user)=>{
        done(null, user);
       })

   });

   }))
}