

function update(){
  player.body.velocity.x = 0;

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
    else if (cursors.up.isDown)
    {
        player.body.velocity.y = -100;
        player.animations.play('up');
    }
    else if (cursors.down.isDown)
    {
        player.body.velocity.y = 100;
        player.animations.play('down');
    }
    else
    {
        player.animations.stop();
        player.body.velocity.y = 0;
        player.frame = 0;
    }
}
