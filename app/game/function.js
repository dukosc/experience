var fireRate = 100;
var nextFire = 0;

function fire() {
  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    bullet = bullets.getFirstExists(false);
    bullet.scale.setTo(0.5, 0.5);
    // bullet.anchor.setTo(0.2, 0.5);
    bullet.rotation = game.physics.arcade.angleToPointer(gun);
    bullet.reset(gun.body.center.x, gun.body.center.y+5);
    game.physics.arcade.moveToPointer(bullet, 2500, game.input.activePointer);
  }
}
