var fireRate = 100;
var nextFire = 0;

function fire() {
  if (game.time.now > nextFire && bullets.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    console.log(player.body.x);
    bullet = bullets.create(player.x, player.y, 'bullet');
    bullet.scale.setTo(0.05, 0.05);
    bullet.rotation = game.physics.arcade.angleToPointer(player);
    // bullet.reset(player.x, player.y);
    game.physics.arcade.moveToPointer(bullet, 200);
  }
}
