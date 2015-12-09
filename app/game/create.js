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

//////////////TILE GENERATION//////////////Shout out to plissken2013es https://github.com/plissken2013es/phaserRandomDungeon/blob/master/js/main.js



            this.keyboard = game.input.keyboard;
            this.map = [];
            this.wallTiles = [];

            //The array below will hold our floor tiles (player CAN move through)
            this.floorTiles = [];
            this.room_max_size = 4;
            this.room_min_sixe =2;
            this.max_rooms = 7;
            //below - do we need this? I believe that we will need to render our sprite there?
            this.player = game.add.sprite(0, 0, 'player');
            this.makeMap();
            this.renderMap();

            this.player = game.add.sprite(this.player.x, this.player.y, 'player');
            game.physics.enable(this.player, Phaser.Physics.ARCADE);
          }
        }

        //Below: This is used for randomization
        getRandom: function(min, max) |{
          return Math.floor(Math.random() * (max - min)) + min;
        },

        //Below: Defining a tile, giving it an x and y position, define what type of block it is, and assign it an image (i.e. 'wall' or 'floor')
        Tile: function(x, y, moveBlock, sightBlock, image) {
          this.x = x;
          this.y = y;
          this.moveBlock = moveBlock;
          this.sightBlock = sightBlcok;
          this.image = image;
          this.object;
        },
        //Below: Room Class uses a set of coordinates to define a rectantular shape that we will later carve our of the wall tiles and fill with floor tiles

        Room: function(x, y, w, h) {
          //x1 and y1 define the top-left corner of the rectangle, while x2, and y2 define the bottom-right corner
          this.x1 = x;
          this.y1 = y;
          this.x2 = x + w;
          this.y2 = y +h;

          //Below: We create this array which holds the center x and center y coordinates with [0] being x and [1] being y. We'll use these later when configure out tennels
          this.center_coords =[];
          center_x = (this.x1 + this.x2) / 2;
          center_y = (this.y1 + this.y2) / 2;
          this.center_coords.push(center_x);
          this.center_coords.push(center_y);

          //Below: Used to create rooms (a rectangle of non-blocked tiles) on the map
          createRoom: function(room) {
            for (var x = room.x1; x < room.x2; x+=32) {
              for (var y = room.y1; y < room.y2; y+=32){
                this.map.push(new this.Tile(x,y, false, false, 'floor'));
              }
            }
          },

          //Creating a Horizontal Tunnel
          createHTunnel: function(x1, x2, y) {
            this.min = Math.min(x1, x2);
            this.max = Math.max(x1, x2);
            for (var y = this.min; y < this.max + 32; y+=32){
              this.map.push(new this.Tile(x, y, false, false, 'floor'));
            }
          },

          //Creating a Vertical Tunnel
          createVtunnel: function(y1, y2, x){
            this.min = Math.min(y1, y2);
            this.max = Math.max(y1, y2)
            for (var y = this.min; y < this.max + 32; y+=32) {
              this.map.push(new this.Tile(x, y, false, false, 'floor'));
            }
          },

          makeMap: function(){
//we start out by filling the map in with the wal tiels. Later we weill carve the rooms out of this.
for(var y = 0; y < game.world.height; y+=16) {
  for(var x =0; x < game.world.width; x+=16) {
    this.map.push(new this.Tile(x, y, true, true, 'wall'));
  }
}
            //We use these variable to store, identify, and enumerate our rooms
this.rooms = [];
this.num_rooms = 0;

// For each room in max_rooms, we do the following
for (var r = 0; r < this.max_rooms; r++) {

  // Generate a random width and height within the constraints of room_min/max_size
  w = this.getRandom(this.room_min_size, this.room_max_size) * 32;
  h = this.getRandom(this.room_min_size, this.room_max_size) *32;

  //Generate a ranom posion, still within world bounds. NOw in order for this work (and not create rooms off of the screen), the game screen dimension must be in muliples of 32
  x = this.getRandom(1, ((game.world.width) / 32) - (w/32 + 1)) * 32;
  y = this.getRandom(1, ((game.world.heigt) / 32) - (h/32 + 1)) * 32

//here we create a Room object based on the variables above. Remember that a Room object is basically a 'blueprint' of th eroom, if you will, and not an 'actual' room

this.new_room = new this.Room(x, y, w, h);

//now that we have blueprint for the room, we can actually create it

this.createRoom(this.new_room);

//we put the player in the center of the first room
if (this.num_rooms ==0) {

  //we want the player to be placed in the middle of hte first room, so we store the room's center coords for player placement
  this.player_x = this.new_room.center_coords[0];
  this.player_y = this.new_room.center_coords[1];

  //Remember, these varioables are used in the create function when we actually create the player
  this.player.x = this.player_x;
  this.player.y = this.player_y;

  //For all rooms except for the first one, we connect a tunnel leading back to the previously created room

} else {
//Get the coordinates to the New Room (the destination
//of the tunnel). Since the coord will be in the middle of the 32x32 tile
this.new_x = this.new_room.center_coords[0] - 16;
this.new_y = this.new_room.center_coords[1] - 16;

//Get the coordinates for the old room (the starting point of the tunnel).
this.prev_x = this.rooms[this.num_rooms -1].center_coords[0] - 16;
this.prev_y = this.rooms[this.num_rooms -1].center_coord[1] - 16;

//creat the tunnels using the coordinates defined above
this.createHTunnel(this.prev_x, this.new_x, this.prev_y);
this.creatVTunnel(this.prev_y, this.new_y, this.new_x);
}

//append the new room to the list
this.rooms.push(this.new_room);
this.num_rooms += 1;
}
rederMap: function() {
// For each item in the map array
for (var i =0; i < this.map.length; i++) {
//If this item is a floor tile...
if (this.map[i].image == 'floor') {
  this.floortile = game.add.sprite(this.map[i].x, this.map[i].y, this.map[i].image);
  this.floortile.body.immovable = true;

  //if this item is a wall tile -
} else if (this.map[i].image == 'wall');
//We add the appropriate sprite, enable physics, and add it to the wall Tiles array
this.walltile = game.add.sprite(this.map[i].x, this.map[i].image);
gamephysics.enable (this.walltile, Phaser.Physics, ARCADE);
this.walltile.body.immovable = true;
this.wallTiles.push(this.walltile);

update: funtion() {
//First, we configure the map so that ht efloor tile is lad down, it creates a 'hole', in the corresponding wall tile.
for (var i = 0, i < this.wallTiles.Length; i++) {
  for (var j = 0; j < this.floorTiles.length; j++) {
    if(game.physics.arcade.overlap(this.wallTiles[i], this.floorTiles[j])){
    }
  }
}
  //Next, we iterate through the 'wallTiles' array, and configure collision with the player
  for (var i =0; i < this.wallTiles.length; i++) {
    game.physics.arcade.collide(this.wallTiles[i], this.player);
  }

}

}
