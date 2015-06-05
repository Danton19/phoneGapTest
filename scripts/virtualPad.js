var VirtualPad = function(game, player) {
    
    this.game = game;
    this.player = player;

    this.restartFlag = false;
    // create our virtual game controller buttons 
    this.buttonJump = this.game.add.button(600, 350, 'btn-a', null, this);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    this.buttonJump.inputEnabled = true;
    this.buttonJump.fixedToCamera = true;
    this.buttonJump.events.onInputDown.add(function(){this.player.moveJump=true;}, this);
    this.buttonJump.events.onInputUp.add(function(){this.player.moveJump=false;}, this);

    this.buttonAttack = this.game.add.button(720, 350, 'btn-b', null, this);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    this.buttonAttack.inputEnabled = true;
    this.buttonAttack.fixedToCamera = true;
    this.buttonAttack.events.onInputDown.add(function(){this.player.moveAttack=true;}, this);
    this.buttonAttack.events.onInputUp.add(function(){this.player.moveAttack=false;}, this);

    this.buttonLeft = this.game.add.button(20, 350, 'btn-left', null, this);
    this.buttonLeft.inputEnabled = true;
    this.buttonLeft.fixedToCamera = true;
    this.buttonLeft.events.onInputDown.add(function(){this.player.moveL=true;}, this);
    this.buttonLeft.events.onInputUp.add(function(){this.player.moveL=false;}, this);

    this.buttonRight = this.game.add.button(97, 350, 'btn-right', null, this);
    this.buttonRight.inputEnabled = true;
    this.buttonRight.fixedToCamera = true;
    this.buttonRight.events.onInputDown.add(function(){this.player.moveR=true;}, this);
    this.buttonRight.events.onInputUp.add(function(){this.player.moveR=false;}, this);

    this.buttonRestart = this.game.add.button(420, 340 , 'btn-restart', null, this);
    this.buttonRestart.scale.setTo(0.3,0.3);
    this.buttonRestart.inputEnabled = true;
    this.buttonRestart.alpha = 0;
    this.buttonRestart.fixedToCamera = true;
    this.buttonRestart.events.onInputDown.add(function(){this.restartFlag = true;}, this);

    this.buttonNext = this.game.add.button(420, 340 , 'btn-next', null, this);
    this.buttonNext.scale.setTo(0.3,0.3);
    this.buttonNext.inputEnabled = true;
    this.buttonNext.alpha = 0;
    this.buttonNext.fixedToCamera = true;
    this.buttonNext.events.onInputDown.add(function(){this.restartFlag = true;}, this);
    //game.add.existing(this);
};

VirtualPad.prototype = Object.create(Phaser.Sprite.prototype);
VirtualPad.prototype.constructor = VirtualPad;