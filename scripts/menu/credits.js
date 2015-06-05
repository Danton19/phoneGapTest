'use strict';

BasicGame.Credits = function (game) {
};

BasicGame.Credits.prototype = {
  preload: function() {
  },

  //We track the offset of each button
  pos: [150],

  //We track which callback each button has
  callbacks: ['menuState'],

  create: function() {
    // this.background = this.game.add.sprite(0, 0, 'background'); //TODO: Add cool background image
    this.game.stage.backgroundColor = 0x000000;

    //BUTTONS
    //We now create our buttons using a constructor function, YAY!
    this.buttons = this.game.add.group();
    this.button3 = this.addButton(3, this.playState);
    this.button3.anchor.setTo(0.5, 0.5);
    this.buttons.add(this.button3);

    //ARROW
    //Add it with initial position at first button
    this.arrow = this.game.add.image(this.game.world.centerX - 100,
    this.game.world.centerY + this.pos[0], 'menu_arrow');
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

    

    this.createTexts();

    this.cursors = this.game.input.keyboard.createCursorKeys();
    },

    update: function() {
        this.move(this.cursors, this.buttons);
    },

    move: function (cursors, buttons) {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
            //This will activate the button that the pointer is at
            this.activateButton(buttons, this.arrow.currentButton);
        }
    },

    activateButton: function (buttons, currentButton) {
        this[this.callbacks[currentButton - 1]]();
    },

    addButton: function (button, func) {
        return this.game.add.button(this.game.world.centerX,
        this.game.world.centerY + this.pos[0], 'menu_back', func);
    },

    menuState: function () {
        this.game.state.start('menu');
    },

    createTexts: function () {
        this.howtoText = this.game.add.text(this.game.world.centerX - 200, this.game.world.centerY - 150, "Nico Benito - Design/Programming");
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;

        this.howtoText = this.game.add.text(this.game.world.centerX - 200, this.game.world.centerY - 75, "José Luna - Artist");
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;

        this.howtoText = this.game.add.text(this.game.world.centerX - 200, this.game.world.centerY, "Axel Prieto - Programming");
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;
    },
};