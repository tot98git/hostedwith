const mongoose = require('mongoose');
const providerSchema = new mongoose.Schema(
    {
        isp:{
            type:String,
            required:true
        },
        AS:String,
        count:Number,
        country:String,
        ref_link:String,
        desc:String,
        deleted:Number,
        date:Date,
        percentage:Number,
        growth:Number,
        oldgrowth:Number,
        thumb:String            

    }
)
module.exports = mongoose.model('providers',providerSchema);