var tower;
var ground;
var platforms;
var score;
var scoreText;
var lifeText;
var enemiesKilledText;
var isGameOver;
var gameOverText;
var resetButton;
var KILL_COUNT_TO_WIN = 10;

// SOUND
var music;
var gameOverSnd;
var slashSnd;
var swishSnd;

var GameState = function(game){};

GameState.prototype.preload = function() {
};

GameState.prototype.create = function() {
        
    music = this.game.add.audio('boden');
    gameOverSnd = this.game.add.audio('gameOverSnd');
    slashSnd = this.game.add.audio('slashSnd');
    swishSnd = this.game.add.audio('swishSnd');
    
    music.play();
    
    this.goFullScreen();
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'sky');
    
    enemiesKilled = 0;
    score = 0;
    isGameOver = false;
    
    //ground
    platforms = this.game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(0, this.game.world.height - 64, 'ground');
    ground.body.immovable = true;
    ground.width = this.game.width;
    
    //tower creation
    tower = new Tower(this);
    
    //enemies group creation
    enemies = this.game.add.group();
    
    //score and life texts
    scoreText = this.game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });
    lifeText = this.game.add.text(16, 40, 'Life: 100', { fontSize: '32px', fill: '#FFF' });
    enemiesKilledText = this.game.add.text(16, 64, 'Enemies killed: ' + enemiesKilled + '/' + KILL_COUNT_TO_WIN, { fontSize: '32px', fill: '#FFF' });

    resetButton = this.game.add.button(TOWER_X_POS, TOWER_Y_POS - (TOWER_Y_POS / 1.5), 'reset', this.reStart, this);
    resetButton.anchor.setTo(0.5); // set both the x and y anchors to the middle.
    resetButton.input.useHandCursor = true;
    resetButton.visible = false;
};

GameState.prototype.update = function() {
    this.game.physics.arcade.collide(enemies, platforms);
    this.game.physics.arcade.collide(enemies, tower.bullets, Enemy.enemyKill, null, this);
    this.game.physics.arcade.collide(enemies, tower, tower.damageHit, null, this);
    
    tower.arrow.rotation = this.game.physics.arcade.angleToPointer(tower.arrow);

    if (this.game.input.activePointer.isDown)
    {
        tower.fire(this);
    }
    if(tower.life <= 0)
    {
        tower.life = 100; // so it doesn't enter again in next update
        this.gameOver();
    }
    else if(!isGameOver)
    {
       Enemy.addEnemy(this, enemies);
    }
    
    if(isGameOver) { // moved to the end of the update loop to avoid game crash on collision detections over enemies
        enemies.removeAll(true);
    }
};

GameState.prototype.gameOver = function(playerWins) {
    gameOverSnd.play();
    music.stop();
    
    isGameOver = true;
    resetButton.visible = true;
    
    scoreText.destroy();
    lifeText.destroy();
    enemiesKilledText.destroy();
    
    var textToDisplay = 'GAME OVER';
    
    if (playerWins) {
        textToDisplay = 'YOU WIN!!!';
    }
    
    gameOverText = this.game.add.text(-30, TOWER_Y_POS - (TOWER_Y_POS / 1.25), textToDisplay, { fontSize: '50px', fill: 'black' });
    gameOverText.anchor.setTo(0.5);
    var tween = this.game.add.tween(gameOverText.position).to( { x: TOWER_X_POS, y: TOWER_Y_POS - (TOWER_Y_POS / 1.25) }, 1000, Phaser.Easing.Elastic.Out, true);
};

//Responsive function
GameState.prototype.goFullScreen = function() {
	this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.forceLandscape = true;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.setScreenSize(true);
};

GameState.prototype.reStart = function() {
    this.create();
};