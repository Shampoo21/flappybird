// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var score = 0;
var player;
var pipes;
// var scoreDisplay;

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("Batman", "assets/flappy_batman.png");
    game.load.image("Superman", "assets/flappy_superman.png");
    game.load.image("WonderWoman", "assets/WonderWoman_Render.png");
    game.load.image("Pipe", "assets/pipe2-body.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.audio("BatmanSound", "assets/BatmanSound.wav");
    game.load.audio("Whip", "assets/whip.wav");
    game.load.image("Cloud", "assets/cloud.png");
    game.load.audio("BackgroundMusic", "assets/bkgloop.wav");
    game.load.image("PipeEnd", "assets/pipe2-end.png");
    game.load.audio("BatmanTheme", "assets/batmansong.mp3");
    game.load.audio("WWS", "assets/wws.wav");
}

function clickHandler ( event ) {
//    alert(event.x + ":" + event.y + " - You suck!");
    game.add.sprite(event.x - 50, event.y - 75, "WonderWoman");
    game.add.sprite(event.x + 100, event.y + 50, "Batman")
}

function bHandler () {
    game.sound.play("score");
    score = score + 1;
    player.kill();
    player = game.add.sprite(player.x, player.y, "Superman");

    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;
    player.body.velocity.y = -100;

    player.body.gravity.y = 200;

    music.pause();
    music = game.add.audio("BackgroundMusic", 1, true);
    music.play("",0,1,true);
}

function nHandler () {
    game.sound.play("Whip");
    score = score + 2;

    player.kill();
    player = game.add.sprite(player.x, player.y, "WonderWoman");

    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;
    player.body.velocity.y = -100;

    player.body.gravity.y = 200;

    music.pause();
    music = game.add.audio("WWS", 1, true);
    music.play("",0,1,true);
}

function mHandler () {
    game.sound.play("BatmanSound");
    score = score + 3;
    player.kill();
    player = game.add.sprite(player.x, player.y, "Batman");

    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;
    player.body.velocity.y = -100;

    player.body.gravity.y = 200;


    music.pause();
    music = game.add.audio("BatmanTheme", 1, true);
    music.play("",0,1,true);
}

// function spaceHandler ()
//{
  //  scoreDisplay.destroy(score.toString());
  //  scoreDisplay = game.add.text (770, 370, score.toString())
//}


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

function player_jump() {
    player.body.velocity.y = -150
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.setBackgroundColor("#6699FF");
    game.input.onDown.add(clickHandler);
    game.add.sprite(0, 0, "Cloud");
    music = game.add.audio("BackgroundMusic", 1, true);
    music.play("",0,1,true);

//    for(var horizontal = 4; horizontal <=20 ; horizontal+=4) {
//        var hole = Math.floor(Math.random() * 5) + 1;
//        for (var count = 0; count <= 8; count++) {
//            if (count != hole && count != (hole + 1) && count != (hole +2)) {
//                game.add.sprite(50 * horizontal, 50 * count, "Pipe")
//            }
//        }
//    }


    pipes = game.add.group();
    game.time.events.loop(2*Phaser.Timer.SECOND, generate_pipes);

    //var pipe_offset = 700;
    //var gapStart = Math.floor(Math.random() * 4) + 1;
    //var gapSize = 3;
    //for(var count=0; count < gapStart; count++) {
    //    add_pipe_part(pipe_offset, count * 50, "Pipe")
    //}
    //for(var count=gapStart + gapSize; count<8; count++) {
    //    add_pipe_part(pipe_offset, count * 50, "Pipe")
    //}

    var x = 100;
    var y = 200;
    player = game.add.sprite(x, y, "Superman");
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.checkWorldBounds = true;
    player.body.velocity.y = -100;

    player.body.gravity.y = 200;
    // scoreDisplay = game.add.text(770, 370, score.toString());


    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(player_jump);
    game.input.keyboard.addKey(Phaser.Keyboard.B).onDown.add(bHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.N).onDown.add(nHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(mHandler);

//    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight);
//    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft);
//    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp);
//    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown);

    game.add.audio("score");
    game.add.audio("BatmanSound");
    game.add.audio("Whip");

}

function add_pipe_part(x, y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;
}

function generate_pipes() {

    var pipe_offset = 700;
    var pipe_size = 50;

    var hole = Math.floor(Math.random() * 5) + 1;

    var i;
    for(i=0 ; i<hole-1 ; i++) {
            add_pipe_part(pipe_offset, i * pipe_size, "Pipe");
    }
    add_pipe_part(pipe_offset-2, i * pipe_size, "PipeEnd");
    i+=3;

    add_pipe_part(pipe_offset-2, i * pipe_size, "PipeEnd");
    for(i=hole+2 ; i<8 ; i++) {
        add_pipe_part(pipe_offset, i * pipe_size+12, "Pipe");
    }
    //}
    //
    //var i;
    //for(i=0; i<hole; i++) {
    //    add_pipe_part(pipe_offset, i * pipe_size, "Pipe")
    //}
    //
    //for(i=hole+2; i<8; i++) {
    //    add_pipe_part(pipe_offset, i * pipe_size, "Pipe")
    //}
}

/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

  game.physics.arcade.overlap(player,pipes, game_over);
    
}

function game_over() {

   location.reload();
}