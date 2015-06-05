var HUD = function(game, player) {
    this.game = game;
    this.player = player;

    this.lifeText = this.game.add.text(10, 10, "Life");
    this.lifeText.font = 'Press Start 2P';
    this.lifeText.fontSize = 18;
    this.lifeText.fill = 'white';
    this.lifeText.strokeThickness = 2;
    this.lifeText.fixedToCamera = true;

    this.healthbarFrame = this.game.add.sprite(88, 10,'healthBarBG');
    this.healthbarFrame.fixedToCamera = true;
    this.healthbarFrame.width = 104;
    this.healthbar = this.game.add.sprite(90, 12,'healthBar');
    this.healthbar.fixedToCamera = true;
    this.healthbar.width = this.player.life;
};

HUD.prototype = Object.create(Phaser.Text.prototype);
HUD.prototype.constructor = HUD;

HUD.prototype.correctPlayerNegativeLife = function() {
    if (this.player.life < 0)
            this.player.life = 0;
};


HUD.prototype.update = function() {
    this.correctPlayerNegativeLife();

    //tweens
    this.healthbarEffects = this.game.add.tween(this.healthbar).to({width:this.player.life}, 300, Phaser.Easing.Elastic.None);
    this.healthbarEffects.start();
};