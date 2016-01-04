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
function shootFireball(){
  if(player.mana > 100){
    fireball = game.add.sprite(player.body.center.x, player.body.center.y, 'fireball');
    var fireFlicker = fireball.animations.add('fireFlicker', [0, 1, 2, 3, 4, 5]);
    var fireExplode = fireball.animations.add('fireExplode', [6, 7, 8, 9, 10]);
    fireball.enableBody = true;
    game.physics.arcade.enable(fireball);
    game.physics.arcade.moveToPointer(fireball, 750, game.input.activePointer);
    fireball.anchor.setTo(0.5, 0.5);
    fireball.rotation = game.physics.arcade.angleToPointer(fireball) + 1.6;
    player.mana -= 100;
  }
}
