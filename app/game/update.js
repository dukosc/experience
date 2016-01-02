function update() {
  player.body.velocity.x = 0;
  game.physics.arcade.overlap(player, ammocrates, collectAmmo);
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(bullets, layer, collided);
  game.physics.arcade.collide(enemyBullets, layer, collided);
  weapon.x = player.body.x + 32;
  weapon.y = player.body.y + 32;
  // game.physics.arcade.overlap(bullets, enemies, collisionDetection, processHandler, this);
  // game.physics.arcade.overlap(slashes, enemies, collisionDetection, processHandler, this);
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
  enemiesAlive = 0;

  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      enemiesAlive++;
      game.physics.arcade.overlap(bullets, enemies[i].enemy, bulletHitEnemy, null, this);
      game.physics.arcade.overlap(slashes, enemies[i].enemy, bulletHitEnemy, null, this);
      enemies[i].update();
    }
  }
  // for (var i = 0; i < enemies.length; i++) {
  //   if(player.x < enemies.getAt(i).body.x + 144 && player.x > enemies.getAt(i).body.x - 144 && player.y > enemies.getAt(i).body.y - 144 && player.y < enemies.getAt(i).body.y + 144){
  //     enemies.getAt(i).isRunning = true;
  //   }
  //   if(enemies.getAt(i).isRunning === undefined || enemies.getAt(i).isRunning === false){
  //     enemies.getAt(i).isRunning = false;
  //     enemies.getAt(i).animations.play('idle', 10, true);
  //   }
  //   if(enemies.getAt(i).isRunning === true){
  //     moveToPlayer(enemies.getAt(i));
  //     if(enemies.getAt(i).x < player.x){
  //       enemies.getAt(i).scale.x = 1;
  //     }
  //     else{
  //       enemies.getAt(i).scale.x = -1;
  //     }
  //     enemies.getAt(i).animations.play('run', 10, true);
  //   }
  // }
  if (game.input.keyboard.isDown(Phaser.KeyCode.ONE)) {
    weapon.kill();
    addWeapon('gun', 'gun');
  }
  if (game.input.keyboard.isDown(Phaser.KeyCode.TWO)) {
    weapon.kill();
    addWeapon('sword', 'sword');
  }
  if (game.input.keyboard.isDown(Phaser.KeyCode.THREE)) {
    weapon.kill();
    addWeapon('shield', 'shield');
  }
  if (wasd.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('run', 10, true);
}
    if (wasd.left.isDown && wasd.space.isDown) {
      player.body.velocity.x = -300;
      player.animations.play('run', 20, true);
    }
    if (wasd.left.isDown && wasd.e.isDown) {
      player.body.velocity.x = -600;
      player.animations.play('run', 40, true);
      game.time.events.add(Phaser.Timer.HALF * 1, slowDownLeft, this);
    }
    function slowDownLeft() {
      player.body.velocity.x = -150;
      player.animations.play('run', 10, true);
    }
  if (wasd.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('run', 10, true);
  }
 if (wasd.right.isDown && wasd.space.isDown) {
  player.body.velocity.x = 300;
  player.animations.play('run', 20, true);
}
if (wasd.right.isDown && wasd.e.isDown) {
 player.body.velocity.x = 600;
 player.animations.play('run', 20, true);
 game.time.events.add(Phaser.Timer.HALF * 1, slowDownRight, this);
}
function slowDownRight() {
  player.body.velocity.x = 150;
  player.animations.play('run', 10, true);
}
  if (wasd.up.isDown) {
    player.body.velocity.y = -150;
    player.animations.play('run', 10, true);
  }
  if (wasd.up.isDown && wasd.space.isDown) {
    player.body.velocity.y = -300;
    player.animations.play('run', 20, true);
  }
  if (wasd.up.isDown && wasd.e.isDown) {
    player.body.velocity.y = -600;
    player.animations.play('run', 20, true);
    game.time.events.add(Phaser.Timer.HALF * 1, slowDownUp, this);
  }
  function slowDownUp() {
    player.body.velocity.y = -150;
    player.animations.play('run', 10, true);
  }
 if (wasd.down.isDown) {
    player.body.velocity.y = 150;
    player.animations.play('run', 10, true);
  }
  if (wasd.down.isDown && wasd.space.isDown) {
    player.body.velocity.y = 300;
    player.animations.play('run', 20, true);
  }
  if (wasd.down.isDown && wasd.e.isDown) {
    player.body.velocity.y = 600;
    player.animations.play('run', 20, true);
    game.time.events.add(Phaser.Timer.HALF * 1, slowDownDown, this);
  }
  function slowDownDown() {
    player.body.velocity.y = 150;
    player.animations.play('run', 10, true);
  }
  if (!wasd.up.isDown && !wasd.down.isDown) {
    player.body.velocity.y = 0;
  }
  if (!wasd.down.isDown && !wasd.up.isDown && !wasd.right.isDown && !wasd.left.isDown) {
    // player.animations.stop();
    player.animations.play('idle', 10, true);
    player.body.velocity.y = 0;
  }

  if (swung === true && swordEquipped) {
    weapon.angle = weapon.angle + 90;
  }
  if (timer.seconds > 0.1) {
    slash.kill();
    timer.stop();
  }

  //collision
  // game.physics.arcade.collide(player, walls);

}
