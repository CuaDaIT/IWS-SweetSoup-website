const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
    name:{type: String, required: true},
    phone:{type: String, required: true},
    email:{type: String, required: true},
    location:{type: String, required: true},
    quantity:{type: Number, required: true},
    total_price:{type:String,required:true},
    date:{type:Date,default:Date.now}
})

const Order = mongoose.model('Order',OrderSchema)
module.exports = Order