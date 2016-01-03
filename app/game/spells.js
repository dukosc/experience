function activateShield(){
  if(game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
    shield.visible = true;
    weapon.visible = false;
    shield.body.enable = true;
    shieldEquipped = true;
    player.mana--;
    shield.animations.play('shieldFlicker', 10);
    game.physics.arcade.overlap(enemyBullets, shield, bulletBlocked, null, this);
  }
}
