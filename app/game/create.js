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
var ammo;
var health;
var map;
var layer;
var stats = JSON.parse(localStorage.getItem('stats'));
function create() {

  console.log(stats);
  game.stage.backgroundColor = '#787878';

  map = game.add.tilemap('snowmap');


  map.addTilesetImage('tiles', 'tiles');
  map.setCollisionByExclusion([13, 14, 8]);


  layer = map.createLayer('SnowLevel');

  game.physics.startSystem(Phaser.Physics.ARCADE);







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
  ammocrates = game.add.group();
  ammocrates.enableBody = true;
  ammocrates.physicsBodyType = Phaser.Physics.ARCADE;
  ammocrates.setAll('anchor.x', 0.5);
  ammocrates.setAll('anchor.y', 0.5);
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
  slashes.createMultiple(10, 'slash', 0, false);
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
  player.health = 10 + stats.endurance;
  player.stamina = 100 + (stats.endurance/5);
  player.mana = 100 + (stats.wisdom/2);
  console.log(player.health);
  // player.enableBody = true;
  addWeapon('gun');
  game.camera.follow(player);
  enemies = [];

  enemiesTotal = 5;
  enemiesAlive = 5;

  for (var i = 0; i < enemiesTotal; i++) {
    enemies.push(new Enemy(i, game, player, bullets));
  }
  game.input.onDown.add(unpause, self);
  ammo = game.add.text(0, 0, "Ammo: " + player.ammo, {
    font: "30px Arial",
    fill: "#ff0044",
    align: "left"
  });
  ammo.fixedToCamera = true;
  ammo.cameraOffset.setTo(0, 0);
  health = game.add.text(0, 0, "Health: " + player.health, {
    font: "30px Arial",
    fill: "#ff0044",
    align: "left"
  });
  health.fixedToCamera = true;
  health.cameraOffset.setTo(150, 0);
  stamina = game.add.text(0, 0, "Stamina: " + player.stamina, {
    font: "30px Arial",
    fill: "#ff0044",
    align: "left"
  });
  stamina.fixedToCamera = true;
  stamina.cameraOffset.setTo(300, 0);
  //movement animations

  var run = player.animations.add('run', [4, 5, 6, 7, 8]);
  var idle = player.animations.add('idle', [0, 1, 2, 3]);
  cursors = game.input.keyboard.createCursorKeys();

  wasd = {
    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
    e: game.input.keyboard.addKey(Phaser.Keyboard.E),
    p: game.input.keyboard.addKey(Phaser.Keyboard.P),
  };

}
