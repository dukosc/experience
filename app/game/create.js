var player;
var walls;
var cursors;
var wasd;
var weapon;
var bullets;
var slashes;
var enemies;
var gunEquipped = true;
var swordEquipped = false;
var swung = false;
var timer;
var text;
var map;
var layer;

function create() {
  game.stage.backgroundColor = '#787878';

  //  The 'mario' key here is the Loader key given in game.load.tilemap
  map = game.add.tilemap('snowmap');

  //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
  //  The second parameter maps this name to the Phaser.Cache key 'tiles'
  map.addTilesetImage('tiles', 'tiles');
  map.setCollisionByExclusion([13, 14, 8]);

  //  Creates a layer from the World1 layer in the map data.
  //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
  layer = map.createLayer('SnowLevel');
  // wallLayer = map.createLayer('Walls');

  //  This resizes the game world to match the layer dimensions
  // wallLayer.resizeWorld();
  game.physics.startSystem(Phaser.Physics.ARCADE);
  //backgound
  // game.add.sprite(0, 0, 'background');






  //bullet physics
  layer.resizeWorld();
  timer = game.time.create();
  game.input.onDown.add(attack, this);
  game.stage.backgroundColor = '#fff000';

  game.physics.startSystem(Phaser.Physics.ARCADE);
  bullets = game.add.group();
  bullets.enableBody = true;
  bullets.physicsBodyType = Phaser.Physics.ARCADE;
  bullets.createMultiple(30, 'bullet', 0, false);
  bullets.setAll('anchor.x', 0.5);
  bullets.setAll('anchor.y', 0.5);
  bullets.setAll('outOfBoundsKill', true);
  bullets.setAll('checkWorldBounds', true);
  enemyBullets = game.add.group();
  enemyBullets.enableBody = true;
  enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
  enemyBullets.createMultiple(30, 'bullet', 0, false);
  enemyBullets.setAll('anchor.x', 0.5);
  enemyBullets.setAll('anchor.y', 0.5);
  enemyBullets.setAll('outOfBoundsKill', true);
  enemyBullets.setAll('checkWorldBounds', true);
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
  // for (var i = 0; i < 20; i++) {
  //   enemy = enemies.create(game.world.randomX, game.world.randomY, 'enemy');
  //   enemy.body.setSize(64, 64, 0, 0);
  // }
  // enemies.setAll('anchor.x', 0.5);
  // enemies.setAll('anchor.y', 0.5);
  // enemies.callAll('animations.add', 'animations', 'idle', [0,1,2,3], true);
  // enemies.callAll('animations.add', 'animations', 'run', [4,5,6,7,8,9], true);
  player = game.add.sprite(500, game.world.height - 301, 'player');
  player.anchor.setTo(0.5, 0.5);
  game.physics.arcade.enable(player);
  player.body.setSize(64, 64);
  player.body.collideWorldBounds = true;
  player.ammo = 60;
  addWeapon('gun');
  game.camera.follow(player);
  enemies = [];

  enemiesTotal = 5;
  enemiesAlive = 5;

  for (var i = 0; i < enemiesTotal; i++) {
    enemies.push(new Enemy(i, game, player, bullets));
  }
  text = game.add.text(0, 0, "Ammo: " + player.ammo, {
    font: "30px Arial",
    fill: "#ff0044",
    align: "left"
  });
  text.fixedToCamera = true;
  text.cameraOffset.setTo(0, 0);
  //movement animations

  var run = player.animations.add('run', [4, 5, 6, 7, 8]);
  var idle = player.animations.add('idle', [0, 1, 2, 3]);
  cursors = game.input.keyboard.createCursorKeys();

  wasd = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D),
  };

}
