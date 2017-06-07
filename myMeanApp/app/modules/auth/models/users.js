var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});//the hash and salt will be used instead of saving a password

/*The salt is a string of characters unique to each user. 
The hash is created by combining the password provided by the user and the salt, 
and then applying one-way encryption. As the hash cannot be decrypted, 
the only way to authenticate a user is to take the password, combine it with the salt and encrypt it again. 
If the output of this matches the hash, then the password must have been correct.*/


/*We’ll use this method when creating a user; 
instead of saving the password to a password path we will be able to pass it to the 
setPassword function to set the salt and hash paths in the user document. */
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

/**Checking the password is a similar process, but we already have the salt from the Mongoose model. 
 * This time we just want to encrypt the salt and the password and see if the output matches the stored hash. */
userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};


userSchema.methods.generateJwt = function(){
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
}; /*Note: It is important that your secret is kept safe – only the originating server should know what it is. 
It is best practice to set the secret as an environment variable, 
and not have it in the source code, especially if your code is stored in version control somewhere.*/

mongoose.model('User', userSchema);

