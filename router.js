var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res) {
   res.send('./public/index.html');
});

router.get('/join', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/game.html'));
});

module.exports = router;