var player;
var cursors;

function create(){

  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = game.add.sprite(100, game.world.height - 301, 'hero');
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  //movement animations
  player.animations.add('left', [4, 5, 6, 7], 8, true);
  player.animations.add('right', [8, 9, 10, 11], 8, true);
  player.animations.add('up', [12, 13, 14, 15], 8, true);
  player.animations.add('down', [1, 2, 3, 0], 8, true);

  cursors = game.input.keyboard.createCursorKeys();
}
