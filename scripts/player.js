var Player = function(game,x,y,sprite) {
    // CONSTANTS
    this.X_VELOCITY = 300;
    this.JUMP_VELOCITY = 500;
    this.FIRE_RATE = 300;
    this.MAX_LIFE = 100;

    // VARIABLES
    this.life = this.MAX_LIFE;
    this.nextFire = 0;
    this.facing = "right";
    this.isAlive = true;

    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.bounce.y = 0.0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = false;
    this.body.setSize(8, 23);
    
    // Our animations, walking left and right.
    this.animations.add('left', [7, 6, 5, 6], 10, false);
    this.animations.add('right', [0, 1, 2, 1], 10, false);
    this.animations.add('shootLeft', [12, 13, 14, 15], 20, false);
    this.animations.add('shootRight', [11, 10, 9, 8], 20, false);
    this.scale.setTo(2,2);

    this.cursors = this.game.input.keyboard.createCursorKeys();

    //bullets group
    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(50, 'ball');
    this.bullets.setAll('checkWorldBounds', true);
    this.bullets.setAll('outOfBoundsKill', true);

    //controls
    this.moveL;
    this.moveR;
    this.moveAttack;
    this.moveJump;

    this.game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(game) {

    this.body.velocity.x = 0;

    if(this.moveL){
        this.moveLeft();
    }
    else if(this.moveR){
        this.moveRight();
    }else {
        if(this.animations._anims.shootRight.isPlaying || this.animations._anims.shootLeft.isPlaying)
        {
            this.events.onAnimationComplete.add(function(){
                this.standStill();
            }, this);
        }
        else
           this.standStill(); 
    } 

    if(this.moveJump){
        this.jump();
    }
    if(this.moveAttack){
        this.shoot();
    }
};

Player.prototype.jump = function() {
    //  Allow the player to jump only if they are touching the ground.
    if (this.body.onFloor())
    {
        this.body.velocity.y = -this.JUMP_VELOCITY;
    }
};

Player.prototype.moveLeft = function() {
    this.body.velocity.x = -this.X_VELOCITY;
    this.animations.play('left');
    this.facing = "left";
}

Player.prototype.moveRight = function() {
    this.body.velocity.x = this.X_VELOCITY;
    this.animations.play('right');
    this.facing = "right";
}

Player.prototype.standStill = function() {
    this.animations.stop();
    if (this.facing === "right") {
        this.frame = 3;
    } else {
        this.frame = 4;
    }
}

Player.prototype.run = function() {
    this.body.velocity.x *= 2;
}

Player.prototype.getItem = function(player, item) {
    powerupSFX.play();

    if (player.life + item.lifeToHeal >= player.MAX_LIFE)
        player.life = 100;
    else
        player.life += item.lifeToHeal;

    item.destroy();
}

Player.prototype.receiveHit = function(damage) {
    receiveHitSFX.play();

    this.life -= damage;
}

Player.prototype.shoot = function() {
    

    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        attackSFX.play();

        facingShoot = this.facing === 'right' ? 'shootRight' : 'shootLeft';
        this.animations.play(facingShoot);
        
        this.nextFire = this.game.time.now + this.FIRE_RATE;
        //var bullet = this.bullets.create(this.x, this.y, 'ball');
        var bullet = this.bullets.getFirstDead();
        bullet.scale.setTo(1.3,1.3);

        bullet.reset(this.x, this.y);

        var bulletXTarget = this.facing === 'right' ? this.x + 1 : this.x - 1;

        this.game.physics.arcade.moveToXY(bullet, bulletXTarget, this.y, 500);
        
    }
}