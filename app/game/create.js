var player;
var cursors;
var weapon;
var bullets;
var slashes;
var enemies;
var gunEquipped = true;
var swordEquipped = false;
var swung = false;
var timer;

function create() {
  game.world.setBounds(0, 0, 1920, 1920);
  timer = game.time.create();
  game.input.onDown.add(attack, this);
  game.stage.backgroundColor = '#fff000'
  game.physics.startSystem(Phaser.Physics.ARCADE);
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet', 0, false);
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  slashes = game.add.group();
  slashes.enableBody = true;
  slashes.physicsBodyType = Phaser.Physics.ARCADE;
  slashes.createMultiple(1, 'slash', 0, false);
  slashes.setAll('anchor.x', 0.5);
  slashes.setAll('anchor.y', 0.5);
  slashes.setAll('outOfBoundsKill', true);
  slashes.setAll('checkWorldBounds', true);
  enemies = game.add.group();
  enemies.enableBody = true;
  enemies.physicsBodyType = Phaser.Physics.ARCADE;
  enemies.setAll('checkWorldBounds', true);
  for (var i = 0; i < 20; i++) {
    enemy = enemies.create(game.world.randomX, game.world.randomY, 'enemy');
    enemy.body.setSize(64, 64, 0, 0);
  }
  enemies.setAll('anchor.x', 0.5);
  enemies.setAll('anchor.y', 0.5);
  enemies.callAll('animations.add', 'animations', 'idle', [0,1,2,3], true);
  enemies.callAll('animations.add', 'animations', 'run', [4,5,6,7,8,9], true);
  player = game.add.sprite(100, game.world.height - 301, 'player');
  player.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(player);
  player.body.setSize(64, 64);
  player.body.collideWorldBounds = true;
  addWeapon('gun');
  game.camera.follow(player);
  //movement animations

  var run = player.animations.add('run', [4, 5, 6, 7, 8]);
  var idle = player.animations.add('idle', [0, 1, 2, 3]);
  cursors = game.input.keyboard.createCursorKeys();
}
