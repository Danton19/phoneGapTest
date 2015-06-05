var Item= function(game, x, y, sprite){
	//Esta clase tiene que servir para crear todos los items del level, de toda clase
	//y luego cada clase de objeto tendra sus funciones.
	//Los enemigos tambien, todo lo relacionado al diseño del level se crea desde el mismo.
	Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.bounce.y = 0.4;
    this.body.gravity.y = 1000;
    this.scale.setTo(0.2, 0.2);
    if(sprite=="heart")
    {
        this.animations.add('stay', [0, 1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1], 8, true);
        this.animations.play('stay');
    }

    this.lifeToHeal = 25; // This actually belongs to another more specialized class

    this.game.add.existing(this);
};

Item.prototype = Object.create(Phaser.Sprite.prototype);
Item.prototype.constructor = Item;
