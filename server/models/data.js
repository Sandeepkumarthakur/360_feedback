const mongoose = require('mongoose');

const Data = new mongoose.Schema({
    empcode:{
        type: String,
        require: true,
    },
    empname:{
        type: String,
        require: true
    },
    people: {
        type:String,
        required: true,
    },
    location: {
        type:String,
        required: true,
    },
    department: {
        type:String,
        required: true,
    },
    competency:[],
    value:[],
})

module.exports = mongoose.model("data", Data);