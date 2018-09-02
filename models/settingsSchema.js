const mongoose = require('mongoose');
const settingsSchema = new mongoose.Schema(
    {   
        headline1:String,
        headline2:String,
        soc_link_fb:String,
        soc_link_ig:String,
        soc_link_tw:String,
        copyright:String,
        mode:String,

    }
)
module.exports = mongoose.model('settings',settingsSchema);