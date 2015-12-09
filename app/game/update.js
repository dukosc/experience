function update() {
  player.body.velocity.x = 0;
  sword.rotation = game.physics.arcade.angleToPointer(player);
  if (cursors.left.isDown) {
    player.body.velocity.x = -100;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 100;
    player.animations.play('right');
  }
  if (cursors.up.isDown) {
    player.body.velocity.y = -100;
    player.animations.play('up');
  } else if (cursors.down.isDown) {
    player.body.velocity.y = 100;
    player.animations.play('down');
  }
  if (!cursors.down.isDown && !cursors.up.isDown && !cursors.right.isDown && !cursors.left.isDown) {
    player.animations.stop();
    player.body.velocity.y = 0;
    player.frame = 0;
  }
  if (game.input.activePointer.isDown) {
    fire();
  }
}



////MAP TILE UPDATE////

update: function() {
    game.physics.arcade.collide(this.player, this.walls);

    if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -175;
    } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 175;
    } else {
        this.player.body.velocity.x = 0;
    }

    if (this.cursors.up.isDown) {
        this.player.body.velocity.y = -175;
    } else if (this.cursors.down.isDown) {
        this.player.body.velocity.y = 175;
    } else {
        this.player.body.velocity.y = 0;
    }

}

var LoadState = {
preload: function() {
    var loadingLabel = game.add.text(80, 150, "Loading...", {font: "30px Arial", fill: "#fff"});

    game.load.image("player", "./assets/player.png");
    game.load.image("wall", "./assets/wall.png");
    game.load.image("floor", "./assets/floor.png");
},

create: function() {
    game.state.start("Game");
}
};

game.state.add("Load", LoadState);
game.state.add("Game", RandomDungeon);

game.state.start("Load");
})();
