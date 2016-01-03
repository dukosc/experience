
var preload = function() {
  // game.load.image('sword', 'game/assets/master_sword.gif');
  //  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)
   //  and the tileset/s used to render the map.

   //  Here we'll load the tilemap data. The first parameter is a unique key for the map data.

   //  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd
   //  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and
   //  the JSON object as the 3rd parameter.

   //  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.
   //  This could be Phaser.Tilemap.CSV too.

  game.load.tilemap('snowmap', 'game/assets/tiles/snowmap.json', null, Phaser.Tilemap.TILED_JSON);
   //  Next we load the tileset. This is just an image, loaded in via the normal way we load images:

  game.load.image('tiles', 'game/assets/tiles/tiles.png');
  game.load.image('ammo', 'game/assets/ammo-crate.png');
  game.load.image('sword', 'game/assets/sword.png');
  game.load.image('slash', 'game/assets/slash.png');
  game.load.image('gun', 'game/assets/pistol.png');
  game.load.image('bullet', 'game/assets/bullet.png');
  game.load.spritesheet('shield', 'game/assets/shield_fix.png', 128, 128);
  game.load.image('menu', 'game/assets/number-buttons-90x90.png', 270, 180);
  game.load.spritesheet('enemy', 'game/assets/enemy.png', 128, 128, 10);
  game.load.spritesheet('player', 'game/assets/player.png', 128, 128, 10);
  /////////////////////////////////////////////////////////////////////////audio

  game.load.audio ('gunshot', 'game/assets/audio/gunshot.mp3');
  game.load.audio ('drawSword', 'game/assets/audio/draw-sword.mp3');
  game.load.audio ('drawGun', 'game/assets/audio/draw-gun.mp3');
  game.load.audio ('swordSlash', 'game/assets/audio/sword-slash.mp3');
  game.load.audio ('ammoEquip', 'game/assets/audio/ammo-equip.mp3');
  game.load.audio ('themeSong', 'game/assets/audio/theme-song.mp3');
};
