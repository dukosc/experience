Grub = function(index, game, player) {
  var x = game.world.randomX;
  var y = game.world.randomY;
  // console.log(x, y);
  while(level === 1 && firstMap.getTileWorldXY(x, y, 128, 128).index != 13 && firstMap.getTileWorldXY(x, y, 128, 128).index != 14 && firstMap.getTileWorldXY(x, y, 128, 128).index != 8){
    x = game.world.randomX;
    y = game.world.randomY;
  }
  while(level === 2 && secondMap.getTileWorldXY(x, y, 128, 128).index != 13 && secondMap.getTileWorldXY(x, y, 128, 128).index != 14 && secondMap.getTileWorldXY(x, y, 128, 128).index != 8){
    x = game.world.randomX;
    y = game.world.randomY;
  }
  while(level === 3 && bossMap.getTileWorldXY(x, y, 128, 128).index != 13 && bossMap.getTileWorldXY(x, y, 128, 128).index != 14 && bossMap.getTileWorldXY(x, y, 128, 128).index != 8){
    x = game.world.randomX;
    y = game.world.randomY;
  }
  this.game = game;
  this.health = 3;
  this.player = player;
  this.alive = true;
  this.timer = game.time.create();
  this.enemy = game.add.sprite(x, y, 'grub');
  this.enemy.hitTimer = game.time.create();
  this.enemy.animations.add('run', [0, 1], true);
  this.enemy.animations.add('idle', [2, 3], true);
  this.enemy.isRunning = true;
  this.enemy.anchor.set(0.5);
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
Grub.prototype.damage = function() {
  if (gunEquipped && !fireballHit) {
    this.health -= 1 + (stats.dexterity/10);
  }
  if (swordEquipped && !fireballHit) {
    this.health -= 3 + (stats.strength/10);
  }
  if(fireballHit){
    this.health -= 1 + (stats.intelligence/100);
    fireballHit = false;
  }
  if (this.health <= 0) {
    this.alive = false;
    this.enemy.kill();
    this.healthText.kill();
    if(Math.random() < 0.20){
      dropAmmo(this.enemy.x, this.enemy.y);
    }
    return true;
  }
  this.healthText.text = "Health " + this.health;
  return false;
};

Grub.prototype.update = function() {
  this.timer.start();
  this.game.physics.arcade.collide(this.enemy, layer);
  if(secondLevelLayer != undefined && level === 2){
    this.game.physics.arcade.collide(this.enemy, secondLevelLayer);
  }
  if(snowBossLayer != undefined && level === 3){
    this.game.physics.arcade.collide(this.enemy, snowBossLayer);
  }
  if (this.game.physics.arcade.distanceBetween(this.enemy, this.player) < 300) {
    if(this.enemy.isRunning){
      this.enemy.animations.play('run', 10, true);
    }
    this.game.physics.arcade.moveToObject(this.enemy, this.player);
    if (this.enemy.x > this.player.x) {
      this.enemy.scale.x = -1;
    } else {
      this.enemy.scale.x = 1;
    }
  }
  else{
    if(this.timer.seconds > 1 || ranOnce === true){
      ranOnce = false;
      this.enemy.body.velocity.x = 50 * (Math.round(Math.random()) * 2 - 1) * (Math.round(Math.random()));
      this.enemy.body.velocity.y = 50 * (Math.round(Math.random()) * 2 - 1) * (Math.round(Math.random()));
      this.enemy.animations.play('run', 10, true);
      if(this.enemy.body.velocity.x === 0 && this.enemy.body.velocity.y === 0){
        this.enemy.animations.play('idle', 10, true);
      }
      if(this.enemy.body.velocity.x < 0){
        this.enemy.scale.x = -1;
      }
      else{
        this.enemy.scale.x = 1;
      }
      this.timer.stop();
    }
  }
  this.healthText.x = this.enemy.x;
  this.healthText.y = this.enemy.y - 50;
};
