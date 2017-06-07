var mongoose = require('mongoose');

var sidemenuSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  pageUrl : {
    type: String,
    required: false   
  },
  parentId: {
    type: Number,
    required: false
  },
  createdDate : {
    type: Date
  }
});

// We can use the Schema pre method to have operations happen before an object is saved.
sidemenuSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // if createdDate doesn't exist, add to that field
  if (!this.createdDate)
    this.createdDate = currentDate;

  next();
});


sidemenuSchema.methods.setPassword = function(){

}



mongoose.model('Sidemenu', sidemenuSchema);

