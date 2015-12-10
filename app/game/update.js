function update() {
  player.body.velocity.x = 0;
  gun.body.x = player.body.x + 60;
  gun.body.y = player.body.y + 32;
  gun.rotation = game.physics.arcade.angleToPointer(gun);
  if (game.input.mousePointer.x < player.body.x + 60) {
    console.log('fire');
    player.scale.x = -1;
    gun.scale.y = -0.5;
    gun.body.x = player.body.x + 60;
  }
  else{
    player.scale.x = 1;
    gun.scale.y = 0.5;
  }
  if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('run', 10, true);
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('run', 10, true);
  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -150;
    player.animations.play('run', 10, true);
  } else if (cursors.down.isDown) {
    player.body.velocity.y = 150;
    player.animations.play('run', 10, true);
  }
  if (!cursors.up.isDown && !cursors.down.isDown) {
    player.body.velocity.y = 0;
  }
  if (!cursors.down.isDown && !cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown) {
    // player.animations.stop();
    player.animations.play('idle', 10, true)
    player.body.velocity.y = 0;
  }
  if (game.input.activePointer.isDown) {
    fire();
  }
}
