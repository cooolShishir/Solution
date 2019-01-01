let PostModel = require('../models/post.model')
let express = require('express')
let router = express.Router()

function getAgeInHours(){
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let ageInHours = month*30*24 + day*24

  return ageInHours/100
}

// Create a new post
// POST localhost:3000/post
router.post('/post', (req, res) => {

  if(!req.body) {
    return res.status(400).send('Request body is missing')
  }

  if(!req.body.title) {
    // ...
  }

  // let post = {
  //   title: 'happy hello',
  //   text: 'are you bored at work from room'
  // }


  req.body.zscore = getAgeInHours()
  
  let model = new PostModel(req.body)
  model.save()
    .then(doc => {
      if(!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      console.log("error")
      res.status(500).json(err)
    })
})

//GET
// to get any post using title
router.get('/post', (req, res) => {
  if(!req.query.title) {
    return res.status(400).send('Missing URL parameter: title')
  }
  PostModel.findOne({
    title: req.query.title
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// UPDATE
//to update likes,comments,shares and views etc of any post
// by default all are set to 0  at time of creation of post
router.put('/post', (req, res) => {
  
  if(!req.body.title) {
    return res.status(400).send('Missing URL parameter: title')
  }

  let a = req.body.shares
  let b = req.body.likes
  let c = req.body.views
  let d = req.body.comments 
  let z = a*5 + b*4 + c*3 + d*2

  req.body.zscore = getAgeInHours()/100 + z
  PostModel.findOneAndUpdate({
    title: req.body.title
  }, req.body, {
    new: true
  })
    .then(doc => {
      console.log("updated")
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// DELETE
router.delete('/post', (req, res) => {
  if(!req.body.title) {
    return res.status(400).send('Missing URL parameter: title')
  }

  PostModel.findOneAndRemove({
    title: req.body.title
  })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


// api as well as function to get feeds, ideally this function may be called every 30 minutes
// and feeds can be stored in redis
router.get('/getfeeds', (req, res) => {
  PostModel.find({
  }).sort({zscore:-1})
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

function getFeeds(){
  PostModel.find({
  }).sort({zscore:-1})
    .then(doc => {
      console.log(doc[0])
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

// setInterval(function(){
//   getFeeds()}, 30*60)


//storing feeds in redis for higher rate of access
// var redis = require('redis');
// var client = redis.createClient();

// client.on('connect', function() {
//     console.log('Redis client connected');
// });

// client.on('error', function (err) {
//     console.log('Something went wrong ' + err);
// });

// client.set('my test key', 'my test value', redis.print);
// client.get('my test key', function (error, result) {
//     if (error) {
//         console.log(error);
//         throw error;
//     }
//     console.log('GET result ->' + result);
// });












module.exports = router