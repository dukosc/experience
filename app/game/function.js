var fireRate = 100;
var nextFire = 0;
var swingRate = 100;
var nextSlash = 0;
var slash;
var bullet;

function gunFire() {
  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    bullet = bullets.getFirstExists(false);
    bullet.scale.setTo(0.5, 0.5);
    bullet.rotation = game.physics.arcade.angleToPointer(weapon);
    bullet.reset(player.body.center.x, player.body.center.y);
    bullet.body.setSize(32, 32);
    game.physics.arcade.moveToPointer(bullet, 1500, game.input.activePointer);
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

function collisionDetection(projectile, enemy) {
  enemy.kill();
  projectile.kill();
  console.log('this is what its like when worlds collide');
}

function processHandler(projectile, enemy) {
  return true;
}
function moveToPlayer(enemy){
  game.physics.arcade.moveToObject(enemy, player, 60);
}
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
