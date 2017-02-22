function GameRoomFactory(num) {

    var gameRooms = [];

    var gameRoom = {};

    for(var i = 0; i < num; i++) {

        gameRoom.roomNum = i;
        gameRoom.players = [];

        gameRooms.push(gameRoom);
    }

    return gameRooms;
}