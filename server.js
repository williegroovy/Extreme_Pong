var express = require('express');
var app = express();

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
    var host = server.address();
    var port = server.address().port;

    console.log('App listening at http://' + host + ':' + port);
}

app.use(express.static('public'));


var io = require('socket.io')(server);


var gameClients = [];

io.sockets.on('connection', function(socket) {

    console.log("we have a new client: " + socket.id);

    //var gameOne = io.sockets.adapter.rooms["gameOne"];

    console.log("Join game One");
    socket.join("gameOne");

    socket.on('mouse', function(data) {
        socket.to("gameOne").emit('mouse', data);
    });

    socket.on('disconnect', function() {
       console.log('Client has disconnected');
    });
});
