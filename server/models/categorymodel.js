const mongoose = require("mongoose")
const categoryschema = new mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique:true
    },
        img:{
            type:String,
            default:""
        }
    },
    {
        timestamp: true,
    }
)
module.exports = mongoose.model("category",categoryschema)