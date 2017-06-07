/**
 * The final thing to do in the back-end is make sure that only authenticated users can access the
 *  /api/profile route. The way to validate a request is to ensure that the JWT sent with it is genuine, 
 * by using the secret again – this is why you should keep it a secret and not in the code.
 */
var express = require('express');
var router = express.Router();
//var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
//var jwt = require('express-jwt');
/*var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload' //the name of the property to create on the req object that will hold the JWT. We’ll be able to use this property inside the controller associated to the route. 
});*/

//router.get('/profile', auth, ctrlProfile.profileRead);


router.post('/login', ctrlAuth.login);


router.post('/register', ctrlAuth.register);

module.exports = router;