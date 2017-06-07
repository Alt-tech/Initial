var express = require('express');
var router = express.Router();
var ctrlFeed = require('../controllers/feedController');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload' //the name of the property to create on the req object that will hold the JWT. We’ll be able to use this property inside the controller associated to the route. 
});

router.post('/feed', auth, ctrlFeed.saveFeed);

router.get('/getFeeds', auth, ctrlFeed.getFeeds);


module.exports = router;