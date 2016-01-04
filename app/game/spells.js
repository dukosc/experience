function activateShield(){
  if(wasd.q.isDown && player.mana > 0) {
    console.log(player.mana);
    weapon.visible = false;
    shield.visible = true;
    shield.body.enable = true;
    player.mana--;
    console.log(player.mana);
    if(player.mana <= 0){
      shield.visible = false;
    }
    mana.text = "Mana: " + player.mana;
    shield.animations.play('shieldFlicker', 10);
    game.physics.arcade.overlap(enemyBullets, shield, bulletBlocked, null, this);
    game.physics.arcade.overlap(enemyArrows, shield, bulletBlocked, null, this);
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
    fireballSound.play();
    fireball = game.add.sprite(player.body.center.x, player.body.center.y, 'fireball');
    var fireFlicker = fireball.animations.add('fireFlicker', [0, 1, 2, 3, 4, 5]);
    var fireExplode = fireball.animations.add('fireExplode', [6, 7, 8, 9, 10]);
    fireball.enableBody = true;
    game.physics.arcade.enable(fireball);
    game.physics.arcade.moveToPointer(fireball, 750, game.input.activePointer);
    fireball.anchor.setTo(0.5, 0.5);
    fireball.body.setSize(128, 32, 0, -32);
    fireball.rotation = game.physics.arcade.angleToPointer(fireball) + 1.6;
    player.mana -= 100;
  }
}
