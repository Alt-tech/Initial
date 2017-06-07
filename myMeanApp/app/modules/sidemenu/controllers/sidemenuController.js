var mongoose = require('mongoose');
require('./../models/sidemenuModel');
var Sidemenu = mongoose.model('Sidemenu');

module.exports.createSidemenuItem = function(req, res){
  var sidemenuItem = new Sidemenu(req.body);

  sidemenuItem.save(function(err, sidemenuItem){
    if(err && err.code == 11000){
      res.status(500).json({
        message: 'duplicate key error'
      });
      throw err;
    } 
    res.status(200).json({
      message: 'sidemenu Item saved successfully'
    });
    console.log('sidemenu Item saved successfully');
  })
};

module.exports.getAllSidemenuItems = function(req, res){
  Sidemenu.find({}, function(err, sidemenuItems) {
  if (err) {
    res.status(500).json({

    });
    throw err;
    
  }

    res.status(200).json(sidemenuItems);
});
};
