function update() {
  player.body.velocity.x = 0;
  weapon.x = player.body.x + 32;
  weapon.y = player.body.y + 32;
  game.physics.arcade.overlap(bullets, enemies, collisionDetection, processHandler, this);
  game.physics.arcade.overlap(slashes, enemies, collisionDetection, processHandler, this);
  if (swordEquipped) {
    weapon.anchor.setTo(0, 1);
    weapon.y = player.body.y + 40;
  }
  weapon.rotation = game.physics.arcade.angleToPointer(weapon);
  if (game.input.mousePointer.x < player.x - game.camera.x) {
    player.scale.x = -1;
    if (gunEquipped) {
      weapon.scale.y = -0.5;
    }
    weapon.x = player.body.x + 32;
  } else {
    player.scale.x = 1;
    if (gunEquipped) {
      weapon.scale.y = 0.5;
    }
  }
  if (game.input.keyboard.isDown(Phaser.KeyCode.ONE)) {
    weapon.kill();
    addWeapon('gun', 'gun');
  }
  if (game.input.keyboard.isDown(Phaser.KeyCode.TWO)) {
    weapon.kill();
    addWeapon('sword', 'sword');
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
  if (swung === true && swordEquipped) {
    weapon.angle = weapon.angle + 90;
  }
  if (timer.seconds > 0.1) {
    slash.kill();
    timer.stop();
  }
}
