function move() {
  if (player.stamina < (100 + Math.floor(stats.endurance / 5))) {
    player.stamina++;
    stamina.text = "Stamina: " + player.stamina;
  }
  if (wasd.left.isDown) {
    player.body.velocity.x = -150 - (stats.dexterity / 5);
    player.stamina--;
    player.animations.play('run', 10, true);
  }
  if (wasd.left.isDown && wasd.space.isDown) {
    if (player.stamina <= 0) {
      player.stamina = 0;
      player.body.velocity.x = -150 - (stats.dexterity / 5);
    } else {
      player.body.velocity.x = -300 - (stats.dexterity / 5);
      player.stamina--;
      stamina.text = 'Stamina: ' + player.stamina;
    }
    player.animations.play('run', 20, true);
  }
  if (wasd.right.isDown) {
    player.body.velocity.x = 150 + (stats.dexterity / 5);
    player.stamina--;
    player.animations.play('run', 10, true);
  }
  if (wasd.right.isDown && wasd.space.isDown) {
    if (player.stamina <= 0) {
      player.stamina = 0;
      player.body.velocity.x = 150 + (stats.dexterity / 5);
    } else {
      player.body.velocity.x = 300 + (stats.dexterity / 5);
      player.stamina--;
      stamina.text = 'Stamina: ' + player.stamina;
    }
    player.animations.play('run', 20, true);
  }
  if (wasd.up.isDown) {
    player.body.velocity.y = -150 - (stats.dexterity / 5);
    player.stamina--;
    player.animations.play('run', 10, true);
  }
  if (wasd.up.isDown && wasd.space.isDown) {
    if (player.stamina <= 0) {
      player.stamina = 0;
      player.body.velocity.y = -150 - (stats.dexterity / 5);
    } else {
      player.body.velocity.y = -300 - (stats.dexterity / 5);
      player.stamina--;
      stamina.text = 'Stamina: ' + player.stamina;
    }
    player.animations.play('run', 20, true);
  }
  if (wasd.down.isDown) {
    player.body.velocity.y = 150 + (stats.dexterity / 5);
    player.stamina--;
    player.animations.play('run', 10, true);
  }
  if (wasd.down.isDown && wasd.space.isDown) {
    if (player.stamina <= 0) {
      player.stamina = 0;
      player.body.velocity.y = 150 + (stats.dexterity / 5);
    } else {
      player.body.velocity.y = 300 + (stats.dexterity / 5);
      player.stamina--;
      stamina.text = 'Stamina: ' + player.stamina;
    }
    player.animations.play('run', 20, true);
  }
  if (!wasd.up.isDown && !wasd.down.isDown) {
    player.body.velocity.y = 0;
  }
  if (!wasd.down.isDown && !wasd.up.isDown && !wasd.right.isDown && !wasd.left.isDown) {
    // player.animations.stop();
    player.animations.play('idle', 10, true);
    player.body.velocity.y = 0;
  }
  if (wasd.up.isDown && wasd.right.isDown) {
    player.stamina++;
  }
  if (wasd.up.isDown && wasd.left.isDown) {
    player.stamina++;
  }
  if (wasd.down.isDown && wasd.right.isDown) {
    player.stamina++;
  }
  if (wasd.down.isDown && wasd.left.isDown) {
    player.stamina++;
  }
  if(wasd.down.isDown && wasd.up.isDown){
    player.stamina++;
  }
  if(wasd.right.isDown && wasd.left.isDown){
    player.stamina++;
  }
  if (wasd.up.isDown && wasd.right.isDown && wasd.space.isDown) {
    if (player.stamina <= 1) {
      player.body.velocity.y = -150 - (stats.dexterity / 5);
      player.body.velocity.x = 150 + (stats.dexterity / 5);
      player.stamina = 0;
    }
    player.stamina++;
  }
  if (wasd.up.isDown && wasd.left.isDown && wasd.space.isDown) {
    if (player.stamina <= 1) {
      player.body.velocity.y = -150 - (stats.dexterity / 5);
      player.body.velocity.x = -150 - (stats.dexterity / 5);
      player.stamina = 0;
    }
    player.stamina++;
  }
  if (wasd.down.isDown && wasd.right.isDown && wasd.space.isDown) {
    if (player.stamina <= 1) {
      player.body.velocity.y = 150 + (stats.dexterity / 5);
      player.body.velocity.x = 150 + (stats.dexterity / 5);
      player.stamina = 0;
    }
    player.stamina++;
  }
  if (wasd.down.isDown && wasd.left.isDown && wasd.space.isDown) {
    if (player.stamina <= 1) {
      player.body.velocity.y = 150 + (stats.dexterity / 5);
      player.body.velocity.x = -150 - (stats.dexterity / 5);
      player.stamina = 0;
    }
    player.stamina++;
  }
}
