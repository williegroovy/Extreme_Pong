
//Keep track of socket session
var socket;

function setup() {
    createCanvas(800, 800);

    background(0);

    socket = io.connect('http://localhost:3000');

    socket.on('mouse', function(data) {
       console.log("Got: " + data.x + " " + data.y);

        //Draw a blue circle
        fill(0, 0, 255);
        noStroke();
        ellipse(data.x, data.y, 20, 20);
    });
}

function draw() {
    //Nothing
}

function mouseDragged() {

    //Draw some white circles
    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 20, 20);

    sendMouse(mouseX, mouseY);
}

function sendMouse(xpos, ypos) {

    var data = {
        x: xpos,
        y: ypos
    };

    socket.emit('mouse', data);
}
