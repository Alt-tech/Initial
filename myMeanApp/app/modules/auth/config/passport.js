//This is where we define the strategy.
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('./../models/users');
var User = mongoose.model('User');

/**
 * For a local strategy we essentially just need to write a Mongoose query on the User model. 
 * This query should find a user with the email address specified, and then call the validPassword method 
 * to see if the hashes match. Pretty simple.

There’s just one curiosity of Passport to deal with. 
Internally the local strategy for Passport expects two pieces of data called username and password. 
However we’re using email as our unique identifier, not username. 
This can be configured in an options object with a usernameField property in the strategy definition. 
After that, it’s over to the Mongoose query
 */

passport.use(new LocalStrategy({
    usernameField: 'email'
},
function(username, password, done){
    User.findOne({ email: username}, function(err, user){
        if(err){ return done(err);}
        if(!user){
            return done(null, false, {
                message: 'User not found'
            });
        }
        if(!user.validPassword(password)){
            return done(null, false, {
                message: 'Password is wrong'
            });
        }
        return done(null, user);

    })
}
))