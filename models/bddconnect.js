var mongoose = require('mongoose')

var option = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,

}

mongoose.connect('mongodb+srv://admin:0gVk03giK5HDsliu@cluster0.zmk5l.mongodb.net/weatherapp?retryWrites=true&w=majority',)