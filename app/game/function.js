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
    ammo.text = 'Ammo: ' + player.ammo;
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
function dropAmmo(x,y){
  ammo = ammocrates.create(x, y, 'ammo');
  ammo.scale.setTo(0.6,0.6);
}
function collectAmmo(){
  ammo.kill();
  player.ammo += 25;
  ammo.text = 'Ammo: ' + player.ammo;
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
function bulletHitPlayer(player, bullet){
  bullet.kill();
  player.health = player.health - 1;
  health.text = 'Health: ' + player.health;
}
function processHandler(projectile, enemy) {
  return true;
}
function gameOver(){
  game.state.restart();
}
