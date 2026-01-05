const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const user_model=mongoose.model('User',user_schema)
module.exports=user_model