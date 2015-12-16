var fireRate = 100;
var nextFire = 0;
var swingRate = 100;
var nextSlash = 0;
var slash;
var bullet;
var ranOnce = true;
function gunFire() {
  if (game.time.now > nextFire && bullets.countDead() > 0 && player.ammo > 0) {
    nextFire = game.time.now + fireRate;
    bullet = bullets.getFirstExists(false);
    bullet.scale.setTo(0.5, 0.5);
    bullet.rotation = game.physics.arcade.angleToPointer(weapon);
    bullet.reset(player.body.center.x, player.body.center.y);
    bullet.body.setSize(32, 32);
    game.physics.arcade.moveToPointer(bullet, 750, game.input.activePointer);
    player.ammo--;
    text.text = 'Ammo:' + player.ammo;
  }
  else{
    return;
  }
}

function swordSwing() {
  if (game.time.now > nextFire && slashes.countDead() > 0) {
    nextSlash - game.time.now + swingRate;
    slash = slashes.getFirstExists(false);
    slash.rotation = game.physics.arcade.angleToPointer(weapon) + 0.80;
    slash.reset(player.body.center.x, player.body.center.y);
    game.physics.arcade.moveToPointer(slash, 750, game.input.activePointer);
    timer.start();
  }
  if (swung === true) {
    swung = false;
  } else {
    swung = true;
  }
}

function addWeapon(wpn, type) {
  if (type === 'sword') {
    swordEquipped = true;
    gunEquipped = false;
  }
  if (type === 'gun') {
    gunEquipped = true;
    swordEquipped = false;
  }
  weapon = game.add.sprite(player.body.x, player.body.y, wpn);
  weapon.scale.setTo(0.5, 0.5);
  weapon.anchor.setTo(0.05, 0.45);
  // game.physics.arcade.enable(weapon);
}

function attack() {
  if (gunEquipped) {
    gunFire();
  }
  if (swordEquipped) {
    swordSwing();
  }
}
function collided(bullet){
  if(gunEquipped){
    bullet.kill();
  }
}
function bulletHitEnemy(enemy, bullet) {
  if(gunEquipped){
    bullet.kill();
  }
  var destroyed = enemies[enemy.name].damage();
}

function processHandler(projectile, enemy) {
  return true;
}
// function moveToPlayer(enemy){
//   game.physics.arcade.moveToObject(enemy, player, 60);
// }
Enemy = function(index, game, player, bullets) {
  var x = game.world.randomX;
  var y = game.world.randomY;
  console.log(map.getTileWorldXY(x, y, 128, 128).index);
  // console.log(x, y);
  while(map.getTileWorldXY(x, y, 128, 128).index != 13 && map.getTileWorldXY(x, y, 128, 128).index != 14 && map.getTileWorldXY(x, y, 128, 128).index != 8){
    x = game.world.randomX;
    y = game.world.randomY;
  }
  this.game = game;
  this.health = 3;
  this.player = player;
  this.bullets = enemyBullets;
  this.fireRate = 2000;
  this.nextFire = 0;
  this.alive = true;
  this.timer = game.time.create();
  this.enemy = game.add.sprite(x, y, 'enemy');
  this.enemy.animations.add('run', [4, 5, 6, 7, 8, 9], true);
  this.enemy.animations.add('idle', [0, 1, 2, 3], true);
  this.gun = game.add.sprite(x, y, 'gun');
  this.gun.scale.setTo(0.5, 0.5);
  this.enemy.anchor.set(0.5);
  this.gun.anchor.set(0.05, 0.45);

  this.enemy.name = index.toString();
  game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
  this.enemy.body.setSize(64, 64, 0, 0);
  this.enemy.body.immovable = false;
  this.enemy.body.collideWorldBounds = true;
  this.enemy.body.bounce.setTo(1, 1);
};
Enemy.prototype.damage = function() {
  if (gunEquipped) {
    this.health -= 1;
  }
  if (swordEquipped) {
    this.health -= 3;
  }
  if (this.health <= 0) {
    this.alive = false;
    this.enemy.kill();
    this.gun.kill();
    return true;
  }
  return false;
}

Enemy.prototype.update = function() {
  this.timer.start();
  this.game.physics.arcade.collide(this.enemy, layer);
  this.gun.x = this.enemy.x;
  this.gun.y = this.enemy.y;
  this.gun.rotation = 0;
  if (this.game.physics.arcade.distanceBetween(this.enemy, this.player) < 300) {
    this.enemy.animations.play('run', 10, true);
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
      this.enemy.animations.stop();
      this.enemy.animations.play('idle', 10, true);
      if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
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
  }
  else{
    if(this.timer.seconds > 2 || ranOnce === true){
      ranOnce = false;
      this.enemy.body.velocity.x = 50 * (Math.round(Math.random()) * 2 - 1) * (Math.round(Math.random()));
      this.enemy.body.velocity.y = 50 * (Math.round(Math.random()) * 2 - 1) * (Math.round(Math.random()));
      this.enemy.animations.play('run', 10, true);
      if(this.enemy.body.velocity.x === 0 && this.enemy.body.velocity.y === 0){
        this.enemy.animations.play('idle', 10, true);
      }
      if(this.enemy.body.velocity.x < 0){
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

};
// Enemy = function(index, game, player, bullets) {
//   var x = game.world.randomX;
//   var y = game.world.randomY;
//   this.game = game;
//   this.player = player;
//   this.enemy = game.add.sprite(x, y, 'enemy', 'enemy');
//   this.enemy.name = index.tos
//   game.physics.enable(this.enemy, Phaser.Physics.ARCADE);
//   this.enemy.body.immovable = false;
//   this.enemy.body.collideWorldBounds = true;
//   this.enemy.body.bounce.setTo(1, 1);
//
// }
