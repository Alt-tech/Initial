var express = require('express');
var router = express.Router();
var ctrlSidemenu = require('../controllers/sidemenuController');


router.post('/create', ctrlSidemenu.createSidemenuItem);

router.get('/getAll', ctrlSidemenu.getAllSidemenuItems);


module.exports = router;