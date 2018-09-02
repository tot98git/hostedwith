const mongoose = require('mongoose');
const searchedSchema = new mongoose.Schema(
    {
        isp:{
            type:String,
            required:true
        },
        url:String,
        date:Date

    }
)
module.exports = mongoose.model('Searched',searchedSchema);