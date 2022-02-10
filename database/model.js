const mongoose = require('mongoose');

const Users = mongoose.Schema({
    username: { type: String },
    nomor: { type: String}, 
    email: { type: String}, 
    kelas: { type: String}, 
    password: { type: String}
}, { versionKey: false });
module.exports.User = mongoose.model('api2', Users);