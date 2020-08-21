var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/file/download', function(req, res, next){
  const file = `./public/images/connetionfiles.zip`;
  res.download(file); // Set disposition and send it.
});


module.exports = router;
