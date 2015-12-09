var fireRate = 100;
var nextFire = 0;
function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
        console.log(player.body.x);
        bullet = bullets.create(player.x, player.y, 'bullet');
        bullet.scale.setTo(0.05, 0.05);
        bullet.rotation = game.physics.arcade.angleToPointer(player);
        // bullet.reset(player.x, player.y);
        game.physics.arcade.moveToPointer(bullet, 200);
    }

}
function update(){
  player.body.velocity.x = 0;
    sword.rotation = game.physics.arcade.angleToPointer(player);
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -100;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 100;
        player.animations.play('right');
    }
    if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.animations.play('down');
    }
    if(!cursors.down.isDown && !cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown)
    {
        player.animations.stop();
        player.body.velocity.y = 0;
        player.frame = 0;
    }
    if(game.input.activePointer.isDown){
      fire();
    }
}
