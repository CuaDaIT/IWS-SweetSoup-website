const mongoose = require('mongoose');
const schema = mongoose.Schema;

const soupSchema = new schema({
    name: {type: String, required:true, unique: true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    img1:{type: String, require: true},
    img2:{type: String, require: true},
});

const Soup = mongoose.model('Soup', soupSchema);

module.exports = Soup;