var express = require('express');
var app = express();
var path = require('path');
var router = require('./router');

var server = app.listen(process.env.PORT || 3000, listen);

function listen() {
    var host = server.address();
    var port = server.address().port;

    console.log('App listening at http://' + 'localhost' + ':' + port);
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/libraries', express.static(__dirname + '/public/libraries'));
app.use('/', router);


var io = require('socket.io')(server);

var MAX_SESSIONS = 10;
var CURR_SESSIONS = 0;

//array of arrays, value at index represents players in session
var playersInSession = [];

io.sockets.on('connection', function(socket) {

    if(CURR_SESSIONS < MAX_SESSIONS) {

        for(var i = 0; i <= CURR_SESSIONS; i++) {

            console.log("Session loop, index: " + i);

            if (playersInSession[i] === undefined) {
                playersInSession[i] = [];
            }

            if (playersInSession[i].length < 2) {
                playersInSession[i].push(socket.id);
                console.log("Join game ", i + 1);
                socket.gameSession = i;
                socket.join(i);

                if(playersInSession[i].length == 2) {
                    CURR_SESSIONS += 1;
                }

                console.log("CurrSessions: " + CURR_SESSIONS);

                break;
            }
        }
    } else {
        console.log("Sorry too many games in session");
    }

    socket.on('mouse', function(data) {
        socket.to(socket.gameSession).emit('mouse', data);
    });

    socket.on('disconnect', function() {

        console.log("Game Session: " + socket.gameSession);

        if (socket.gameSession !== undefined) {
            var index = playersInSession[socket.gameSession].indexOf(socket.id);
            playersInSession[socket.gameSession].splice(index, 1);

            console.log("Client: " + socket.id + " disconnected from game: " + socket.gameSession + 1);
            console.log('disconnect players in: ', playersInSession[socket.gameSession].length);

            if (playersInSession[socket.gameSession].length === 1) {
                CURR_SESSIONS -= 1;
            }
        }

        console.log('Client has disconnected');
        console.log("CurrSessions discon: " + CURR_SESSIONS);

    });
});
