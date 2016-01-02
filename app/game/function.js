var fireRate = 100;
var nextFire = 0;
var swingRate = 100;
var nextSlash = 0;
var slash;
var bullet;
var ranOnce = true;

function gunFire() {
  if (!game.paused) {
    if (game.time.now > nextFire && bullets.countDead() > 0 && player.ammo > 0) {
      nextFire = game.time.now + fireRate;
      bullet = bullets.getFirstExists(false);
      bullet.scale.setTo(0.5, 0.5);
      bullet.rotation = game.physics.arcade.angleToPointer(weapon);
      bullet.reset(player.body.center.x, player.body.center.y);
      bullet.body.setSize(32, 32);
      game.physics.arcade.moveToPointer(bullet, 750, game.input.activePointer);
      player.ammo--;
      ammo.text = 'Ammo: ' + player.ammo;
    } else {
      return;
    }
  }
}

function swordSwing() {
  if (!game.paused) {
    if (game.time.now > nextFire && slashes.countDead() > 0) {
      nextSlash = game.time.now + swingRate;
      slash = slashes.getFirstExists(false);
      slash.rotation = game.physics.arcade.angleToPointer(weapon) + 0.80;
      slash.reset(player.body.center.x, player.body.center.y);
      game.physics.arcade.moveToPointer(slash, 750, game.input.activePointer);
      swingTimer.start();
    }
    if (swung === true) {
      swung = false;
    } else {
      swung = true;
    }
  }
}

function shieldBlock() {
  if (game.time.now > nextFire && blocks.bullet() > 0) {
}
}

function addWeapon(wpn, type) {
  if (type === 'sword') {
    swordEquipped = true;
    gunEquipped = false;
    shieldEquipped = false;
  }
  if (type === 'gun') {
    gunEquipped = true;
    swordEquipped = false;
    shieldEquipped = false;
  }
  //added this below
  if (type === 'shield') {
    gunEquipped = false;
    swordEquipped = false;
    shieldEquipped = true;
  }
  weapon = game.add.sprite(player.body.x, player.body.y, wpn);
  weapon.scale.setTo(0.5, 0.5);
  weapon.anchor.setTo(0.05, 0.45);
  // game.physics.arcade.enable(weapon);
}

function dropAmmo(x, y) {
  ammo = ammocrates.create(x, y, 'ammo');
  ammo.scale.setTo(0.6, 0.6);
}

function collectAmmo() {
  ammo.kill();
  player.ammo += 25;
  ammo.text = 'Ammo: ' + player.ammo;
}

function attack() {
  attackTimer.start();
  if (gunEquipped) {
    gunFire();
  }
  if (swordEquipped && attackTimer.seconds > 0.5) {
    swordSwing();
    attackTimer.stop();
  }
}

function collided(bullet) {
  if (gunEquipped) {
    bullet.kill();
  }
}

function bulletHitEnemy(enemy, bullet) {
  if (gunEquipped) {
    bullet.kill();
  }
  var destroyed = enemies[enemy.name].damage();
}

function bulletHitPlayer(player, bullet) {
  bullet.kill();
  player.health = player.health - 1;
  health.text = 'Health: ' + player.health;
}

function processHandler(projectile, enemy) {
  return true;
}

function gameOver() {
  game.state.restart();
}

function unpause(event) {
  // Only act if paused
  if (game.paused) {
    // Calculate the corners of the menu
    var x1 = 800 / 2 - 270 / 2,
      x2 = 800 / 2 + 270 / 2,
      y1 = 600 / 2 - 180 / 2,
      y2 = 600 / 2 + 180 / 2;

    // Check if the click was inside the menu
    if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2) {
      // The choicemap is an array that will help us see which item was clicked
      var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

      // Get menu local coordinates for the click
      var x = event.x - x1,
        y = event.y - y1;

      // Calculate the choice
      var choise = Math.floor(x / 90) + 3 * Math.floor(y / 90);

      // Display the choice
      choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
    } else {
      // Remove the menu and the label
      menu.destroy();
      choiseLabel.destroy();

      // Unpause the game
      game.paused = false;
    }
  }
};
