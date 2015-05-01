var BasicGame = {};

BasicGame.Preload = function (game) {
    this.preloadBar = null;
};

BasicGame.Preload.prototype = {
    preload: function () {

        // IMAGES
        this.game.load.image('sky', 'images/sky.png');
        this.game.load.image('ground', 'images/platform.png');
        this.game.load.spritesheet('dude', 'images/dude.png', 32, 48);
        this.game.load.image('reset', 'images/reset.png');
        this.game.load.image('arrow','images/arrow.png');
        this.game.load.image('bullet','images/bullet.png');
        this.game.load.image('tower','images/Tower.png');
        
        // AUDIO
        //  Firefox doesn't support mp3 files, so use ogg
        this.game.load.audio('boden', ['audio/bodenstaendig_2000_in_rock_4bit.ogg']);
        this.game.load.audio('gameOverSnd', ['audio/Death.ogg']);
        this.game.load.audio('slashSnd', ['audio/Slash8-Bit.ogg']);
        this.game.load.audio('swishSnd', ['audio/Soft_Airy_Swish.ogg']);
    },
    
    create: function () {
        //this.preloadBar.cropEnabled = false;

        this.state.start('game');
    }
};