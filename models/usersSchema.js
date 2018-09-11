const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const usersSchema = new mongoose.Schema(
    {
        name:String,
        username:String,
        password:String
    }
)
usersSchema.methods.generateHash = (password)=>{
    return bcrypt.hashSync(password,10)
}
usersSchema.methods.validPassword = function(password,password2,cb) {
    bcrypt.compare(password, password2, function (err, isMatch) {
        if (err){console.log("FALSE");return false}
        cb(null,isMatch)
    });
};
module.exports = mongoose.model('users',usersSchema);