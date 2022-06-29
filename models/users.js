var mongoose = require('mongoose')


var  users = mongoose.Schema({
    userName: String,
    email: String,
    password: String,
})

var usersModel = mongoose.model('users', users)


module.exports = usersModel
