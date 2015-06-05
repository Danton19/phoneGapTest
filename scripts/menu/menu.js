'use strict';

BasicGame.Menu = function (game) {
};

BasicGame.Menu.prototype = {
  preload: function() {
  },

  //We track the offset of each button
  pos: [-50, 50, 150],

  //We track which callback each button has
  callbacks: ['playState', 'howToState', 'creditsState'],

  create: function() {
    // this.background = this.game.add.sprite(0, 0, 'background'); //TODO: Add cool background image
    this.game.stage.backgroundColor = 0x000000;

    //BUTTONS
    //We now create our buttons using a constructor function, YAY!
    this.buttons = this.game.add.group();

    this.button1 = this.addButton(1, this.playState);
    this.button1.anchor.setTo(0.5, 0.5);
    this.buttons.add(this.button1);

    this.button2 = this.addButton(2, this.howToState);
    this.button2.anchor.setTo(0.5, 0.5);
    this.buttons.add(this.button2);

    this.button3 = this.addButton(3, this.creditsState);
    this.button3.anchor.setTo(0.5, 0.5);
    this.buttons.add(this.button3);

    //ARROW
    //Add it with initial position at first button
    this.arrow = this.game.add.image(this.game.world.centerX - 100,
    this.game.world.centerY - 50, 'menu_arrow');
    this.arrow.anchor.setTo(0.5, 0.5);
    
    //Arrow will take 200ms to go up/down the menu
    this.arrow.moveDelay = 200;
    
    //Control if the arrow should keep moving or not
    this.arrow.canMove = true;
    
    //Keep track of the current button the pointer is at
    this.arrow.currentButton = 1;
    
    //We add an horizontal tween so that the arrow feels nicer
    this.game.add.tween(this.arrow)
        .to({
            x: this.arrow.x - 10
        }, 700, Phaser.Easing.Quadratic.Out)
        .to({
            x: this.arrow.x
        }, 400, Phaser.Easing.Quadratic.In)
        .loop()
        .start();


        this.gameTitle = this.game.add.image(this.game.world.centerX, this.game.world.centerY - 180, 'menu_title');
        this.gameTitle.anchor.setTo(0.5, 0.5);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        this.move(this.cursors, this.buttons);
    },

    move: function (cursors, buttons) {
        if (cursors.down.isDown && this.arrow.canMove) {
            //This stops the arrow from traveling way too fast
            this.arrow.canMove = false;
            
            //Which is reset to true after a 255ms delay
            this.allowMovement();
            
            if (this.arrow.currentButton === 1) {
                //I made a custom tween function for this
                this.tween(buttons, 2);
            } else if (this.arrow.currentButton === 2) {
                this.tween(buttons, 3);
            } else {
                this.tween(buttons, 1);
            }
        }

        if (cursors.up.isDown && this.arrow.canMove) {
            this.arrow.canMove = false;
            this.allowMovement();
            if (this.arrow.currentButton === 1) {
                this.tween(buttons, 3);
            } else if (this.arrow.currentButton === 2) {
                this.tween(buttons, 1);
            } else {
                this.tween(buttons, 2);
            }
        }

        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            //This will activate the button that the pointer is at
            this.activateButton(buttons, this.arrow.currentButton);
        }
    },

    tween: function (buttons, buttonNum) {
        this.game.add.tween(this.arrow)
            .to({
                y: this.game.world.centerY + this.pos[buttonNum - 1]
            }, this.arrow.moveDelay, Phaser.Easing.Quadratic.In)
            .start();
        this.arrow.currentButton = buttonNum;
    },

    allowMovement: function () {
        this.game.time.events.add(255, (function () {
            this.arrow.canMove = true;
        }), this);
    },

    activateButton: function (buttons, currentButton) {
        this[this.callbacks[currentButton - 1]]();
    },

    addButton: function (button, func) {
        return this.game.add.button(this.game.world.centerX,
        this.game.world.centerY + this.pos[button - 1],
        'menu_button' + button, func);
    },

    playState: function () {
        this.game.state.start('game', true, false, 0);
    },

    howToState: function () {
        this.game.state.start('how');
    },

    creditsState: function () {
        this.game.state.start('credits');
    },
};