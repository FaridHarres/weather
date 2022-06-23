var express = require('express');
var router = express.Router();
var request = require('sync-request')
var cityModel = require('../models/cities')
var usersModel = require('../models/users')
var session = require('express-session')

API_KEY = "75f0434a1c514d2c52b6e948018f2bae"



router.get('/',  function(req, res, next) {
  res.render('login');
});







router.get('/weather', async function(req, res, next){
  console.log(req.session.user)
  if(req.session.user == undefined){
    res.redirect('/')
  }else{
    var allCity = await cityModel.find()
    res.render('weather', {cityList: allCity})
  }

})





router.post('/add-city', async function(req, res, next){
  var city = req.body.newcity.trim().toLowerCase()

  console.log("test",city)

  var alreadyExist = false;
// console.log(cityModel.length)

    var sameCity = await cityModel.findOne({name: city})
//console.log("ville identique",sameCity)
    if(sameCity !== null){
      console.log("je suis ici same city existe ", sameCity)
      alreadyExist = true;
    }
  console.log(alreadyExist)

  if(alreadyExist == false){


    var requete = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&appid=${API_KEY}&units=metric`)
    var dataAPI = JSON.parse(requete.body)
    //console.log("test de la ville",dataAPI)
   if(dataAPI.message == "city not found"){
      //console.log("la ville nhexite pas")
    }else{
      var iconcode = dataAPI.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      //console.log("je suis ici data",dataAPI)
      
      var newCity = new cityModel({
        name: dataAPI.name.toLowerCase(),
        description: dataAPI.weather[0].description,
        icon: iconurl,
        min: dataAPI.main.temp_min,
        max: dataAPI.main.temp_max       
      })

      var citySaved = await newCity.save()
    }  
  }
  var allCity = await cityModel.find()

  res.render('weather', {cityList: allCity})
})





router.get('/delete-city', async function(req, res, next){

  await cityModel.deleteOne({
    name: req.query.name
  })
  
  var allCity = await cityModel.find()

  res.render('weather', {cityList: allCity})
})




router.get('/refresh', async function(req, res, next) {
  var namecity = await cityModel.find()

  for(i=0; i<namecity.length; i++){

    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    var requete = request("GET", `https://api.openweathermap.org/data/2.5/weather?q=${namecity[i].name}&lang=fr&appid=${API_KEY}&units=metric`)
  
    var dataAPI = JSON.parse(requete.body)
    var iconcode = dataAPI.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";


    var newVille = await cityModel.updateOne(
      { name: namecity[i].name},

      { description: dataAPI.weather[0].description,
        icon: iconurl,
        min: dataAPI.main.temp_min,
        max: dataAPI.main.temp_max  }
        
     );
  }
  var allCity = await cityModel.find()

  res.render('weather', { cityList: allCity });
});








//signup 
router.post('/signup', async function(req, res, next) {
  

  var userData = await usersModel.findOne({email : req.body.email})

  if(!userData && req.body.email.trim() !== "" && req.body.username.trim()   !== "" && req.body.password.trim()  !=="" ){

    var newUser = new usersModel({
      userName: req.body.username.toLowerCase(),
      email: req.body.email.toLowerCase(),
      password: req.body.password,  
    })
     
    
  await newUser.save()

    req.session.user = {
      userName : newUser.userName,
      id: newUser._id 
    }
    console.log("session",req.session.user )
    res.redirect('weather');

  }else{
    res.redirect('/')
  }

});

//signin
router.post('/signin', async function(req, res, next) {
  console.log(req.body)

  var userData = await usersModel.findOne({
    email : req.body.email.toLowerCase(),
    password : req.body.password, 
    
  })
  if(userData){
      req.session.user = {
        userName: userData.userName,
        id: userData._id
      }
      console.log("session login,",req.session.user)
      res.redirect('/weather')

  }else{
    res.redirect('/')
  }
});




//logout
router.get('/logout', function(req, res, next) {

  req.session.user=undefined

  res.redirect('/');
});


module.exports = router;
