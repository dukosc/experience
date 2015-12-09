var player;
var cursors;
var sword;
var bullets;

function create() {

  game.physics.startSystem(Phaser.Physics.ARCADE);
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(50, 'bullet');
  bullets.setAll('checkWorldBounds', true);
  bullets.setAll('outOfBoundsKill', true);
  player = game.add.sprite(100, game.world.height - 301, 'hero');
  sword = game.add.sprite(15, 15, 'sword');
  sword.scale.setTo(0.3, 0.3);
  player.addChild(sword);
  // player.addChild(bullets);
  sword.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;

  //movement animations
  player.animations.add('left', [4, 5, 6, 7], 8, true);
  player.animations.add('right', [8, 9, 10, 11], 8, true);
  player.animations.add('up', [12, 13, 14, 15], 8, true);
  player.animations.add('down', [1, 2, 3, 0], 8, true);

  cursors = game.input.keyboard.createCursorKeys();
}
