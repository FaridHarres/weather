
var mongoose = require('mongoose')


var citySchema = mongoose.Schema({
    name: String,
    description: String,
    icon: String,
    min: String,
    max: String,

})

var cityModel= mongoose.model('cities', citySchema)

module.exports = cityModel