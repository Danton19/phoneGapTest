var Enemy = function(game, player, x, y, sprite) {
    // CONSTANTS
    this.VELOCITY = 100;
    this.JUMP_VELOCITY = 400;
    this.VELOCITY_WHEN_FOLLOWING = this.VELOCITY * 2;
    this.DISTANCE_TO_FOLLOW_PLAYER = 150;
    this.DISTANCE_TO_ATTACK_PLAYER = 80;
    this.NEXT_STATE_TIMELAPSE = 800;
    this.ATTACK_DAMAGE = 25;
    this.ATTACK_RATE = 1500;

    // VARIABLES
    this.life = 100;
    this.isFollowingPlayer = false;
    this.states = ['moveLeft', 'stop', 'moveRight', 'stop'];
    this.currentStateCounter = 0;
    this.nextStateTime = 0;
    this.previousXPosition = 0;
    this.nextAttack = 0;

    // hack for accessing player class
    this.player = player;

    Phaser.Sprite.call(this, game, x, y, sprite);
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);
    this.body.bounce.y = 0.0;
    this.body.gravity.y = 1000;
    this.body.collideWorldBounds = false;
    this.scale.setTo(2,2);

    this.animations.add('left', [0, 1, 2], 10, true);
    this.animations.add('right', [5, 4, 3], 10, true);
    this.animations.add('attackToLeft', [6, 7, 8], 10, true);
    this.animations.add('attackToRight', [11, 10, 9], 10, true);

    this.game.add.existing(this);
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(game) {
    this.decidePath();
};

Enemy.prototype.decidePath = function() {    
    if (this.isFollowingPlayer) {
        if (this.isCloseEnoughToAttack()) {
            this.attack();
        } else {
            this.followPlayer();
        }
    } else {
        this.isFollowingPlayer = this.isPlayerClose();

        this.keepPatrolling();
    }
};

Enemy.prototype.followPlayer = function() {
    if (this.x > this.player.x) {
        this.moveLeft();
    } else if (this.x < this.player.x) {
        this.moveRight();
    }

    if (this.previousXPosition === this.x) {
        this.jump();
    };

    this.previousXPosition = this.x;
};

Enemy.prototype.isPlayerClose = function() {
    var distance = this.game.physics.arcade.distanceBetween(this, this.player);

    if (distance < this.DISTANCE_TO_FOLLOW_PLAYER) {
        return true;
    };

    return false;
};

Enemy.prototype.keepPatrolling = function() {
    var now = this.game.time.now;
    
    if (now > this.nextStateTime) {
        var statesLength = this.states.length;

        // http://www.gamedev.net/topic/642433-modulus-operator-usage/
        var nextStateIndex = this.currentStateCounter % statesLength;
        this[this.states[nextStateIndex]]();

        this.currentStateCounter++;
        this.nextStateTime = now + this.NEXT_STATE_TIMELAPSE;
    };
};

Enemy.prototype.stop = function() {
    this.animations.stop();
    this.body.velocity.x = 0;
};

Enemy.prototype.moveLeft = function() {
    this.animations.play("left");
    this.body.velocity.x = -this.VELOCITY;
};

Enemy.prototype.moveRight = function() {
    this.animations.play("right");
    this.body.velocity.x = this.VELOCITY;
};

Enemy.prototype.jump = function() {
    //  Allow jump only if touching the ground
    if (this.body.onFloor())
    {
        this.body.velocity.y = -this.JUMP_VELOCITY;
    }
};

Enemy.prototype.isCloseEnoughToAttack = function() {
    var distance = this.game.physics.arcade.distanceBetween(this, this.player);

    if (distance < this.DISTANCE_TO_ATTACK_PLAYER) {
        return true;
    }

    return false;
};

Enemy.prototype.attack = function() {
    if (this.game.time.now > this.nextAttack)
    {
        if (this.player.life > 0) {
            if (this.x < this.player.x) {
                this.animations.play("attackToRight");
            } else {
                this.animations.play("attackToLeft");
            }

            this.player.receiveHit(this.ATTACK_DAMAGE);

            this.nextAttack = this.game.time.now + this.ATTACK_RATE;
        } else {
            this.animations.stop();
        }
    }
};