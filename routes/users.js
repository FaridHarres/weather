var express = require('express');
var router = express.Router();
var usersModel = require('../models/users')

/* GET users listing. */
// router.get('/login', function(req, res, next) {
//   res.render('login');
// });


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
