var backgroundMusic, powerupSFX, receiveHitSFX, attackSFX, gameOverSFX, winSFX, enemyHitSFX;

var BasicGame = {};

BasicGame.Preload = function (game) {
    this.asset = null;
    this.ready = false;
};

BasicGame.Preload.prototype = {
    preload: function () {
        // PRELOAD
        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.asset = this.add.sprite(this.game.width/2, this.game.height/2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);
        this.load.setPreloadSprite(this.asset);

        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //all levels
        this.game.load.json('allLevels', 'levels/allLevels.json');

        //GAMEPAD
        this.game.load.image('btn-right', 'images/rightPad.png',77,54);
        this.game.load.image('btn-left', 'images/leftPad.png',77,54);
        this.game.load.image('btn-a', 'images/buttonA.png',78,78);
        this.game.load.image('btn-b', 'images/buttonB.png',78,78);
        this.game.load.image('btn-restart', 'images/buttonRestart.png',256,256);
        this.game.load.image('btn-next', 'images/buttonNext.png',256,256);

        //LEVEL 1
        this.load.tilemap('level0', 'levels/lvl0.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level1', 'levels/lvl1.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.tilemap('level2', 'levels/lvl2.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('dirt', 'images/plainDirt0.png');
        this.game.load.image('sandFloorSheet', 'images/sandFloorSheet.png');
        this.game.load.image('sandFloorSheet-sm', 'images/sandFloorSheet-sm.png');
        this.game.load.spritesheet('door','images/door.png',27,29);
        this.game.load.spritesheet('onlyDoor','images/onlyDoor.png',27,29);
        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/ground.png');
        this.game.load.image('gameOver','images/game-over.png',400,300);
        //this.game.load.spritesheet('heart','images/heartsheet.png',41,35);
        this.game.load.spritesheet('heart','images/heartsheet2.png',123,106);
        this.game.load.image('shells','images/shells.png');
        //this.game.load.spritesheet('player', 'images/player.png', 32, 48);
        this.game.load.spritesheet('player', 'images/sandysheetcomplete2.png', 17, 23);
        this.game.load.image('ball', 'images/ballShoot.png');
        // ENEMIES
        this.game.load.spritesheet('darkEnemy','images/enemies/dark_enemy.png', 32, 48);
        this.game.load.spritesheet('crabAttack','images/crabbyattack2.png', 43, 12);

        // MENU
        this.game.load.image('menu_title', 'images/menu/menu_game_title.png');
        this.game.load.image('menu_arrow', 'images/menu/menu_arrow.png');
        this.game.load.image('menu_button1', 'images/menu/menu_button.png');
        this.game.load.image('menu_button2', 'images/menu/menu_button2.png');
        this.game.load.image('menu_button3', 'images/menu/menu_button3.png');
        this.game.load.image('menu_back', 'images/menu/menu_back.png');
        this.game.load.image('menu_shift', 'images/menu/shift.png');
        this.game.load.image('menu_ctrl', 'images/menu/ctrl.png');
        this.game.load.image('menu_up', 'images/menu/up.png');
        this.game.load.image('menu_space', 'images/menu/space.png');
        this.game.load.image('menu_down', 'images/menu/down.png');

        //HUD
        //healthBar
        this.game.load.image('healthBar', 'images/healthBar.png');
        this.game.load.image('healthBarBG', 'images/healthBarBG.png');
        
        // AUDIO
        this.game.load.audio('deserveToBeLoved', ['audio/DeserveToBeLoved.ogg']);
        this.game.load.audio('powerup', ['audio/Powerup.ogg']);
        this.game.load.audio('receiveHit', ['audio/ReceiveHit.ogg']);
        this.game.load.audio('attack', ['audio/Attack.ogg']);
        this.game.load.audio('gameOver', ['audio/GameOver.ogg']);
        this.game.load.audio('win', ['audio/Win.ogg']);
        this.game.load.audio('enemyHit', ['audio/EnemyHit.ogg']);

        powerupSFX = this.game.add.audio('powerup');
        receiveHitSFX = this.game.add.audio('receiveHit');
        attackSFX = this.game.add.audio('attack');
        gameOverSFX = this.game.add.audio('gameOver');
        winSFX = this.game.add.audio('win');
        enemyHitSFX = this.game.add.audio('enemyHit');

        backgroundMusic = this.game.add.audio('deserveToBeLoved');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.3;
    },
    
    create: function () {
        this.asset.cropEnabled = false;
    },

    update: function() {
      if(!!this.ready) {
        this.game.state.start('menu');
      }
    },
    onLoadComplete: function() {
      this.ready = true;
    }
};