var player;
var cursors;
var gun;
var bullets;

function create() {
  game.stage.backgroundColor = '#ffffff'
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet', 0, false);
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  player = game.add.sprite(100, game.world.height - 301, 'player');
  gun = game.add.sprite(0, 0, 'gun');
  player.anchor.setTo(0.5, 0.5);
  gun.scale.setTo(0.5, 0.5);
  gun.anchor.setTo(0.05, 0.45);
  game.physics.arcade.enable(player);
  game.physics.arcade.enable(gun);
  player.body.collideWorldBounds = true;

  //movement animations
  var run = player.animations.add('run', [4, 5, 6, 7, 8, 9]);
  var idle = player.animations.add('idle', [0, 1, 2, 3]);
  cursors = game.input.keyboard.createCursorKeys();
}
