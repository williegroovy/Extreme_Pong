
function Paddle(playerOne) {

    this.pos;

    if(playerOne) {
        this.pos = createVector(20, height/2);
    } else {
        this.pos = createVector(width - 20, height/2);
    }

    this.update = function() {

    }

    this.show = function() {

    }
}