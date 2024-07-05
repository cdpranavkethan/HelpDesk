const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role:{type:String,default:"customer"}
});

module.exports = mongoose.model('User', userSchema);
