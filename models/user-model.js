const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required : true},
    password: {type: String},
    intro: {type: String, required : true},
    ID: {type: String, required : true},
    avatar: {type: String, required : true},
    email: {type: String}    
});

const User = mongoose.model('users',userSchema);

module.exports = User;
