var Platform = function(game, platforms, x, y, spriteName) {

    this.instance = platforms.create(x, y, spriteName);
    game.physics.arcade.enableBody(this);

    this.instance.body.immovable = true;
    this.instance.width = game.width;
};

Platform.prototype = Object.create(Phaser.Sprite.prototype);
Platform.prototype.constructor = Platform;