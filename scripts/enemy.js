var enemies;
var enemiesKilled;
var nextEnemyTime = 400;
var ENEMY_SPEED = 100;
var ENEMY_DAMAGE = 25;

var Enemy = function(theGame, enemies) {
    var enemy;
    var randomNum = Math.floor(Math.random() * 11);
    var xPos = 0;
    var speed = 0;
    var animation = 0;

    if(randomNum < 6)
    {
        xPos = -20;
        speed = ENEMY_SPEED;
        animation = "right";
    }
    else
    {
        xPos = theGame.game.width + 20;
        speed = -ENEMY_SPEED;
        animation = "left";
    }
    
    enemy = enemies.create(xPos, theGame.game.world.height - 150, 'dude');
    theGame.game.physics.arcade.enable(enemy);

    enemy.body.bounce.y = 0.0;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = false;
    enemy.body.velocity.x = speed;
    enemy.animations.add('left', [0, 1, 2, 3], 10, true);
    enemy.animations.add('right', [5, 6, 7, 8], 10, true);
    enemy.animations.play(animation);
    
    return enemy;
};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.addEnemy = function(theGame, enemies) {
    if (theGame.game.time.now > nextEnemyTime)
    {
        nextEnemyTime = theGame.game.time.now + 900;
        enemies.add(new Enemy(theGame, enemies));
    }
};

Enemy.enemyKill = function(enemy, bullet) {
    slashSnd.play();
    
    enemies.remove(enemy); // Better than "enemy.kill();" , unless we wanted to keep the sprite for using it in the future
    enemiesKilled += 1;
    
    bullet.kill();
    score += 10;
    scoreText.text = 'Score: ' + score;
    enemiesKilledText.text = 'Enemies killed: ' + enemiesKilled + '/' + KILL_COUNT_TO_WIN;
    
    if(enemiesKilled >= KILL_COUNT_TO_WIN) {
        this.gameOver(this.playerWins = true); // player wins
    }
};