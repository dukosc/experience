function update() {
  player.body.velocity.x = 0;
  game.physics.arcade.overlap(player, ammocrates, collectAmmo);
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(bullets, layer, collided);
  game.physics.arcade.collide(enemyBullets, layer, collided);
  weapon.x = player.body.x + 32;
  weapon.y = player.body.y + 32;
  game.physics.arcade.overlap(enemyBullets, player, bulletHitPlayer, null, this);
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
  if(player.health <= 0){
    gameOver();
  }
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i].alive) {
      enemiesAlive++;
      game.physics.arcade.overlap(bullets, enemies[i].enemy, bulletHitEnemy, null, this);
      game.physics.arcade.overlap(slashes, enemies[i].enemy, bulletHitEnemy, null, this);
      enemies[i].update();
    }
  }
  if(wasd.p.isDown) {
    game.paused = true;
    menu = game.add.sprite(game.camera.x + 400, game.camera.y +300, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        choiseLabel = game.add.text(game.camera.x + 400/2, game.camera.y+150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
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
  move();
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
