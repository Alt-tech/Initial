var mongoose = require('mongoose');

var feedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl : {
    type: String,
    required: false   
  },
  text: {
    type: String,
    required: true
  },
  createdDate : {
    type: Date
  }
});


// We can use the Schema pre method to have operations happen before an object is saved.
feedSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if createdDate doesn't exist, add to that field
  if (!this.createdDate)
    this.createdDate = currentDate;

  next();
});


/*sidemenuSchema.methods.fetchImageUrl = function(){
   
}*/



module.exports = mongoose.model('Feed', feedSchema);

