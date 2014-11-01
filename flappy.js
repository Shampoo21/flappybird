// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var player;
var scoreDisplay;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(400, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("Batman", "assets/flappy_batman.png");
    game.load.image("Superman", "assets/flappy_superman.png");
    game.load.image("WonderWoman", "assets/WonderWoman_Render.png");
    game.load.audio("score", "assets/point.ogg")
    game.load.audio("BatmanSound", "assets/BatmanSound.wav")
    game.load.audio("Whip", "assets/whip.wav")
}

function clickHandler ( event ) {
//    alert(event.x + ":" + event.y + " - You suck!");
    game.add.sprite(event.x - 50, event.y - 75, "WonderWoman")
    game.add.sprite(event.x + 100, event.y + 50, "Batman")
}

function bHandler () {
    game.sound.play("score");
    score = score + 1;
    player.kill();
    player = game.add.sprite(player.x, player.y, "Superman");
}

function nHandler () {
    game.sound.play("Whip");
    score = score + 2;

    player.kill();
    player = game.add.sprite(player.x, player.y, "WonderWoman");
}

function mHandler () {
    game.sound.play("BatmanSound");
    score = score + 3;
    player.kill();
    player = game.add.sprite(player.x, player.y, "Batman");
}

function spaceHandler ()
{
    scoreDisplay.kill();
    game.add.text (375, 375, score)
}


function moveRight () {
    player.x += 5;
}

function moveLeft () {
    player.x += -5;
}

function moveDown () {
    player.y += 5;
}

function moveUp () {
    player.y += -5;
}
/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#6699FF");
    game.add.text(75, 100,
        "Super Hero Fight!!!",
        {font: "30px Helvetica", fill: "#ffff99"});
    game.input.onDown.add(clickHandler);

    var x = 100;
    var y = 200;
    player = game.add.sprite(x, y, "Superman");

    scoreDisplay = game.add.text (375, 375, score);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add(bHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(nHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(mHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);
    game.add.audio("score")
    game.add.audio("BatmanSound")
    game.add.audio("Whip")
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    
}