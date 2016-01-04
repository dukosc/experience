Enemy = function(index, game, player, bullets) {
  var x = game.world.randomX;
  var y = game.world.randomY;
  // console.log(x, y);
  while(map.getTileWorldXY(x, y, 128, 128).index != 13 && map.getTileWorldXY(x, y, 128, 128).index != 14 && map.getTileWorldXY(x, y, 128, 128).index != 8){
    x = game.world.randomX;
    y = game.world.randomY;
  }
  this.game = game;
  this.health = 10;
  this.player = player;
  this.bullets = enemyBullets;
  this.fireRate = 2000;
  this.nextFire = 0;
  this.alive = true;
  this.timer = game.time.create();
  this.enemy = game.add.sprite(x, y, 'enemy');
  this.enemy.animations.add('run', [4, 5, 6, 7, 8, 9], true);
  this.enemy.animations.add('idle', [0, 1, 2, 3], true);
  this.enemy.isRunning = true;
  this.gun = game.add.sprite(x, y, 'gun');
  this.gun.scale.setTo(0.5, 0.5);
  this.enemy.anchor.set(0.5);
  this.gun.anchor.set(0.05, 0.45);
  this.enemy.name = index.toString();
  game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
  this.healthText = game.add.text(this.enemy.x, this.enemy.y - 50, "Health: " + this.health, {
    font: "12px Arial",
    fill: "#ff0044",
    align: "left"
  });
  this.healthText.anchor.setTo(0.5, 0.5);
  this.enemy.body.setSize(64, 64, 0, 0);
  this.enemy.body.immovable = false;
  this.enemy.body.collideWorldBounds = true;
  this.enemy.body.bounce.setTo(1, 1);
};
Enemy.prototype.damage = function() {
  if (gunEquipped && !fireballHit) {
    this.health -= 1 + (stats.dexterity/10);
  }
  if (swordEquipped && !fireballHit) {
    this.health -= 3 + (stats.strength/10);
  }
  if(fireballHit){
    this.health -= 1 + (stats.intelligence/2);
    fireballHit = false;
    console.log(this.health);
  }
  if (this.health <= 0) {
    this.alive = false;
    this.enemy.kill();
    this.healthText.kill();
    this.gun.kill();
    if(Math.random() < 0.20){
      dropAmmo(this.enemy.x, this.enemy.y);
    }
    return true;
  }
  this.healthText.text = "Health " + this.health;
  return false;
};

Enemy.prototype.update = function() {
  this.timer.start();
  this.game.physics.arcade.collide(this.enemy, layer);
  if(snowBossLayer != undefined){
    this.game.physics.arcade.collide(this.enemy, snowBossLayer);
  }
  this.gun.x = this.enemy.x;
  this.gun.y = this.enemy.y;
  this.gun.rotation = 0;
  if (this.game.physics.arcade.distanceBetween(this.enemy, this.player) < 300) {
    this.gun.scale.x = 0.5;
    if(this.enemy.isRunning){
      this.enemy.animations.play('run', 10, true);
    }
    this.game.physics.arcade.moveToObject(this.enemy, this.player);
    if (this.enemy.x > this.player.x) {
      this.enemy.scale.x = -1;
      this.gun.scale.y = -0.5;
    } else {
      this.enemy.scale.x = 1;
      this.gun.scale.y = 0.5;
    }
    this.gun.rotation = this.game.physics.arcade.angleBetween(this.enemy, this.player);
    if(this.game.physics.arcade.distanceBetween(this.enemy, this.player) < 200){
      this.enemy.isRunning = false;
      if(!this.enemy.isRunning){
        this.enemy.animations.play('idle', 10, true);
      }
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
        enemyGunshot.play();
        this.nextFire = this.game.time.now + this.fireRate;
        var bullet = this.bullets.getFirstDead();
        bullet.body.setSize(32, 32);
        bullet.scale.setTo(0.5, 0.5);
        bullet.reset(this.gun.x, this.gun.y);
        bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
      }
      this.enemy.body.velocity.x = 0;
      this.enemy.body.velocity.y = 0;
    }
    else{
      this.enemy.isRunning = true;
    }
  }
  else{
    if(this.timer.seconds > 1 || ranOnce === true){
      ranOnce = false;
      this.gun.scale.y = 0.5;
      this.enemy.body.velocity.x = 50 * (Math.round(Math.random()) * 2 - 1) * (Math.round(Math.random()));
      this.enemy.body.velocity.y = 50 * (Math.round(Math.random()) * 2 - 1) * (Math.round(Math.random()));
      this.enemy.animations.play('run', 10, true);
      if(this.enemy.body.velocity.x === 0 && this.enemy.body.velocity.y === 0){
        this.enemy.animations.play('idle', 10, true);
      }
      if(this.enemy.body.velocity.x < 0){
        console.log('fire');
        this.enemy.scale.x = -1;
        this.gun.scale.x = -0.5;
      }
      else{
        this.enemy.scale.x = 1;
        this.gun.scale.x = 0.5;
      }
      this.timer.stop();
    }
  }
  this.healthText.x = this.enemy.x;
  this.healthText.y = this.enemy.y - 50;
};
