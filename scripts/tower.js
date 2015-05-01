var TOWER_Y_POS;
var TOWER_X_POS;
var towerTmpImg;
var fireRate = 200;
var nextFire = 0;

var Tower = function(theGame) {
    var tower;
    
    towerTmpImg = theGame.game.cache.getImage('tower');
    TOWER_X_POS = (theGame.game.world.width / 2);
    TOWER_Y_POS = ground.y - (towerTmpImg.height / 2);
    
    tower = theGame.game.add.sprite(TOWER_X_POS, TOWER_Y_POS, 'tower');
    tower.enableBody = true;
    theGame.game.physics.arcade.enable(tower);
    tower.body.immovable = true;
    tower.anchor.setTo(0.5);
    
    tower.life = 100;
    
    //bullets group
    tower.bullets = theGame.game.add.group();
    tower.bullets.enableBody = true;
    tower.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    tower.bullets.createMultiple(50, 'bullet');
    tower.bullets.setAll('checkWorldBounds', true);
    tower.bullets.setAll('outOfBoundsKill', true);
    
    //arrow code
    tower.arrow = theGame.game.add.sprite(TOWER_X_POS, TOWER_Y_POS - (towerTmpImg.height / 2) - 20, 'arrow');
    tower.arrow.anchor.setTo(0.5);
    theGame.game.physics.enable(tower.arrow, Phaser.Physics.ARCADE);
    tower.arrow.body.allowRotation = false;
    
    tower.damageHit = function(tower, enemy) {
        enemies.remove(enemy);
        tower.life -= ENEMY_DAMAGE;
        lifeText.text = 'Life: ' + tower.life;
    };
    
    tower.fire = function(theGame) {
        if (theGame.game.time.now > nextFire && tower.bullets.countDead() > 0)
        {
            swishSnd.play();
            
            nextFire = theGame.game.time.now + fireRate;
    
            var bullet = tower.bullets.getFirstDead();
    
            bullet.reset(tower.arrow.x - 5, tower.arrow.y - 5);
    
            theGame.game.physics.arcade.moveToPointer(bullet, 300);
        }
    };
    
    return tower;
};

Tower.prototype = Object.create(Phaser.Sprite.prototype);
Tower.prototype.constructor = Tower;