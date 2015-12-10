var player;
var cursors;
var sword;
var bullets;
var background;

function create() {
  background = game.add.image(0, 0, 'background');
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
  player.animations.add('left', [16, 17, 18, 19, 20], 9, true);
  player.animations.add('right', [5, 6, 7, 8, 9], 9, true);
  player.animations.add('up', [5, 6, 7, 8, 9], 9, true);
  player.animations.add('down', [5, 6, 7, 8, 9], 9, true);

  cursors = game.input.keyboard.createCursorKeys();
}
