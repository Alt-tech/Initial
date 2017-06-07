var mongoose = require('mongoose');
var User = mongoose.model('User');
var multer = require('multer');
var Feed = require('./../models/feedModel');
var fs = require('fs');
var path = require('path');
var async = require('async');

var fileName = null;

/** Multer Settings */
var storage = multer.diskStorage({ //multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, './app/uploads/')
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            fileName = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
            cb(null, fileName);
        }
    });
var upload = multer({ //multer settings
                    storage: storage
                }).single('file');
/** Multer Settings Ends */  

var convertToBase64 = function(filename){
  //var img = fs.readFileSync(path.join('./app/uploads/', filename));
    //var base64Image = null;
    return fs.readFile(path.join('./app/uploads/', filename), function(err, original_data){

    base64Image = new Buffer(original_data, 'binary').toString('base64');
    console.log(base64Image);
    //res.send(base64Image);
    return base64Image;
}) ;
} ;            

module.exports.saveFeed = function(req, res) {

  //First upload the file in filesystem
  upload(req,res,function(err){
            if(err){
                 res.status(500).json({error_code:1,err_desc:err});
                 return;
            }
              User
      .findById(req.payload._id)
      .exec(function(err, user) {
        if(err){
          res.status(401).json({message: 'unable to find user'});
          console.log('unable to save User');
        }

        var feedItem = new Feed({
          email: user._doc.email,
          name: user._doc.name,
          imageUrl : fileName,
          text: req.body.text
        });

        feedItem.save(function(err, feedItem){
          if(err){
            res.status(500).json({
              message: 'unable to save Feed'
            })
            console.log('unable to save Feed');
          }
          res.status(200).json({
            message: 'Feed saved successfully'
          });
          console.log('Feed saved successfully');
        });
        
      });
        })

};

module.exports.getFeeds = function(req, res){
  Feed.find({},function(err, feeds){
    if(err){
      res.status(500).json({
         message: 'unable to retrieve feeds from db'
      });
      console.log('unable to retrieve feeds from db');
    }
    /*for(var i=0; i<feeds.length; i++){
      if(feeds[i]._doc.imageUrl){
        //base64Image = convertToBase64(feeds[i]._doc.imageUrl);
        //feeds[i]._doc.imageUrl = base64Image;
        fs.readFile(path.join('./app/uploads/', feeds[i]._doc.imageUrl), function(err, original_data){
          var base64Image = new Buffer(original_data, 'binary').toString('base64');
          console.log(base64Image);
          //res.send(base64Image);
          feeds[i]._doc.imageUrl = base64Image;
           if(i == feeds.length)
            res.json(feeds);
}) ;
        }
        else{
          if(i == (feeds.length - 1))
            res.json(feeds);
        }
    }*/
    async.forEach(feeds, function(feed, callback){
      if(feed._doc.imageUrl){
         fs.readFile(path.join('./app/uploads/', feed._doc.imageUrl), function(err, original_data){
          var base64Image = new Buffer(original_data, 'binary').toString('base64');
          console.log(base64Image);
          //res.send(base64Image);
          feed._doc.imageUrl = base64Image;
          callback(null);
      });
    }
    else
      callback(null);
    },function(err){
      if(err){
        res.status(500).json({
          message: 'unable to convert images into base64'
        });
      }
        res.status(200).send(feeds);
      })

    
  })
};