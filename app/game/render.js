function render(){
  for(var i = 0; i < enemies.length; i++){
    game.debug.body(enemies.getAt(i));
  }
}
