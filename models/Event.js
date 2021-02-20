const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    creatorID:{
        type:Schema.Types.ObjectId,
        required:true,
        trim:true
    },
    location:[{type:String}],
    car:{type:Boolean},
    nop:{type:Number},  //nop:number of participants
    participants:[{type:Schema.Types.ObjectId}]
},{timestamps:true})

module.exports = mongoose.model("Event",eventSchema)