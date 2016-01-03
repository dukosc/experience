function activateShield(){
  if(wasd.q.isDown && player.mana > 0) {
    shield.visible = true;
    weapon.visible = false;
    shield.body.enable = true;
    shieldEquipped = true;
    player.mana--;
    mana.text = "Mana: " + player.mana;
    shield.animations.play('shieldFlicker', 10);
    game.physics.arcade.overlap(enemyBullets, shield, bulletBlocked, null, this);
  }
}
function restoreMana(){
  if(player.mana < 100 + (stats.wisdom/2) && wasd.q.isUp){
    player.mana++;
    mana.text = "Mana: " + player.mana;
  }
}
