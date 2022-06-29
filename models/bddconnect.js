var mongoose = require('mongoose')

var option = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,

}

mongoose.connect('mongodb+srv://admin:9iT2H1RVP7pBX6aj@cluster0.zmk5l.mongodb.net/weatherapp?retryWrites=true&w=majority',)