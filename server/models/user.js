const mongoose= require('mongoose');

const customerSchema = new mongoose.Schema({
    id : { type : Number},
    name: { type: String },
    number : { type: Number},
    place: { type: String }
});

const User = mongoose.model("User" , customerSchema);

module.exports =  User;
