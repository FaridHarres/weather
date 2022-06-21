var express = require('express');
var router = express.Router();
var request = require('sync-request')


  var image = [
    {
      url : "/images/boss.svg"
    },
    {
      url : "/images/boy.svg"
    },
    {
      url : "/images/girl-1.svg"
    },
    {
      url : "/images/girl-2.svg"
    },
    {
      url : "/images/girl-3.svg"
    },
    {
      url : "/images/girl.svg"
    },
    {
      url : "/images/man-2.svg"
    },
    {
      url : "/images/man.svg"
    }
  ]


/* GET home page. */
router.get('/', function(req, res, next) {
  var requete = request("GET", "https://jsonplaceholder.typicode.com/users")
  var result = JSON.parse(requete.body)
  res.render('index', { result});
});


router.get('/messages', function(req, res, next) {
  var id = req.query.id
  console.log(id)
  var userId = request("GET", `https://jsonplaceholder.typicode.com/posts?userId=${id}`)
  var resultId = JSON.parse(userId.body)


  console.log("test user",resultId[0])

  res.render('posts', {resultId: resultId[0]});
});
module.exports = router;
