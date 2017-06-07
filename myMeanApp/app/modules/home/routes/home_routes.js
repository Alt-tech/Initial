var express = require('express');
var router = express.Router();
var ctrlProfile = require('../controllers/profile');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload' //the name of the property to create on the req object that will hold the JWT. We’ll be able to use this property inside the controller associated to the route. 
});

router.get('/profile', auth, ctrlProfile.profileRead);


module.exports = router;