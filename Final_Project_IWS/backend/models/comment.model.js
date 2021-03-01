const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    soup_id: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    name: {type:String,required:true,minlength:5},
    comment:{type: String, required:true},
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment