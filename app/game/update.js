function update() {
  player.body.velocity.x = 0;
  game.physics.arcade.overlap(player, ammocrates, collectAmmo);
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(bullets, layer, collided);
  game.physics.arcade.collide(enemyBullets, layer, collided);
  weapon.x = player.body.x + 32;
  weapon.y = player.body.y + 32;
  shield.x = player.body.x + 32;
  shield.y = player.body.y + 32;
  shield.visible = false;
  shieldEquipped = false;
  weapon.visible = true;
  shield.body.enable = false;
  game.physics.arcade.overlap(enemyBullets, player, bulletHitPlayer, null, this);
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
  if(shieldEquipped){

    weapon.animations.play('shieldFlicker', 10);
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
  move();
  if (game.input.keyboard.isDown(Phaser.KeyCode.ONE)) {
    weapon.kill();
    addWeapon('gun', 'gun');
  }

  if (game.input.keyboard.isDown(Phaser.KeyCode.TWO)) {
    weapon.kill();
    addWeapon('sword', 'sword');
  }
  activateShield();
  if (swung === true && swordEquipped) {
    weapon.angle = weapon.angle + 90;
  }
  if (swingTimer.seconds > 0.1) {
    slash.kill();
    swingTimer.stop();
  }
  if(rollDelay.seconds < 0.5 && rollDelay.running === true){
    roll();
  }
  if(rollDelay.seconds > 0.5){
    rollDelay.stop();
    player.angle = 0;
  }
}
