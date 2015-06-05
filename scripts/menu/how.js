'use strict';

BasicGame.How = function (game) {
};

BasicGame.How.prototype = {
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

        // IMAGES

        this.howtoText = this.game.add.image(this.game.world.centerX - 150, this.game.world.centerY - 155, 'menu_down');
        this.howtoText.anchor.setTo(0, 0.5);
        this.howtoText = this.game.add.image(this.game.world.centerX - 270, this.game.world.centerY - 120, 'menu_space');

        this.howtoText = this.game.add.text(this.game.world.centerX - 140, this.game.world.centerY - 100, "or");
        this.howtoText.anchor.setTo(0, 0.5);
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;

        this.howtoText = this.game.add.image(this.game.world.centerX - 90, this.game.world.centerY - 120, 'menu_up');
        
        this.howtoText = this.game.add.image(this.game.world.centerX - 150, this.game.world.centerY - 60, 'menu_shift');
        this.howtoText.anchor.setTo(0, 0.5);

        this.howtoText = this.game.add.image(this.game.world.centerX - 150, this.game.world.centerY - 10, 'menu_ctrl');
        this.howtoText.anchor.setTo(0, 0.5);

        // TEXTS

        this.howtoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 150, "Move");
        this.howtoText.anchor.setTo(0, 0.5);
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;

        this.howtoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 100, "Jump");
        this.howtoText.anchor.setTo(0, 0.5);
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;

        this.howtoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 50, "Run");
        this.howtoText.anchor.setTo(0, 0.5);
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;

        this.howtoText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Attack");
        this.howtoText.anchor.setTo(0, 0.5);
        this.howtoText.font = 'Press Start 2P';
        this.howtoText.fontSize = 18;
        this.howtoText.fill = 'white';
        this.howtoText.strokeThickness = 2;
    },
};