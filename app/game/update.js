function update() {
  player.body.velocity.x = 0;
  if(ammocrates){
    for(var i = 0; i < ammocrates.length; i++){
      game.physics.arcade.enable(ammocrates[i]);
      game.physics.arcade.overlap(player, ammocrates[i], collectAmmo, null, this);
    }
  }
  game.physics.arcade.collide(player, layer);
  game.physics.arcade.collide(bullets, layer, collided);
  game.physics.arcade.collide(fireball, layer, fireHitWall);
  game.physics.arcade.collide(enemyBullets, layer, collided);
  if(snowBossLayer != undefined){
    game.physics.arcade.collide(player, snowBossLayer);
    game.physics.arcade.collide(bullets, snowBossLayer, collided);
    game.physics.arcade.collide(fireball, snowBossLayer, fireHitWall);
    game.physics.arcade.collide(enemyBullets, snowBossLayer, collided);
  }
  weapon.x = player.body.x + 32;
  weapon.y = player.body.y + 32;
  shield.x = player.body.x + 32;
  shield.y = player.body.y + 32;
  if(wasd.q.isUp){
    shield.visible = false;
  }
  if(shield.visible === false){
    shieldEquipped = false;
  }
  if(shield.visible === true){
    shieldEquipped = true;
  }
  weapon.visible = true;
  shield.body.enable = false;
  if(fireball != undefined && fireballHitWall === false){
    fireball.animations.play('fireFlicker', 12);
  }
  if(fireball != undefined && fireballHitWall === true){
    fireball.animations.play('fireExplode', 10);
    fireball.body.velocity.x = 0;
    fireball.body.velocity.y = 0;
    if(fireTimer.seconds > 0.5){
      console.log('fire hit');
      fireball.kill();
      fireballHitWall = false;
      fireTimer.stop();
    }
  }
  game.physics.arcade.overlap(enemyBullets, player, bulletHitPlayer, null, this);
  game.physics.arcade.overlap(enemyArrows, player, bulletHitPlayer, null, this);
  if (swordEquipped) {
    weapon.anchor.setTo(0, 1);
    weapon.y = player.body.y + 40;
  }
  if (laserSwordEquipped) {
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
  if(player.health <= 0){
    gameOver();
  }
  loadEnemiesPhysics();
  if(grubsAlive === 0 && enemiesAlive === 0 && yetiAlive === 0){
    if(levelTimer.running === false){
      levelTimer.start();
      yetiSplash.visible = true;
      yetiSplash.width = 1280;
      yetiSplash.bringToTop();
      player.x = 0;
      player.y = 0;
      for(var i = 0; i < ammocrates.length; i++){
        ammocrates[i].destroy();
      }
    }
    if(levelTimer.seconds > 5){
      layer.destroy();
      player.x = 500;
      player.y = 500;
      yetiSplash.destroy();
      snowBossLayer = bossMap.createLayer('SnowBossLevel');
      snowBossLayer.resizeWorld();
      loadEnemies();
      snowBossLayer.sendToBack();
      levelTimer.stop();
    }

  }
  if(wasd.p.isDown) {
    game.paused = true;
    // menu = game.add.sprite(game.camera.x + 400, game.camera.y +300, 'menu');
    //     menu.anchor.setTo(0.5, 0.5);
    //     choiseLabel = game.add.text(game.camera.x + 400/2, game.camera.y+150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
    //     choiseLabel.anchor.setTo(0.5, 0.5);
    rollIcon = game.add.sprite(game.camera.x + 200, game.camera.y + 100, 'rollIcon');
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
  if(game.input.keyboard.isDown(Phaser.KeyCode.THREE)) {
    weapon.kill();
    addWeapon('laserSword', 'laserSword');
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
  restoreMana();
}
