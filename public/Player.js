
function Player(playerOne) {

    this.paddle = new Paddle(playerOne);

    this.update = function() {

    }

    this.show = function() {

        this.paddle.show();
    }
}