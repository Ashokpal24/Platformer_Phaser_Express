const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      fps: 60,
      gravity: { y: 500 },
    },
  },
  scene: {
    key: "game",
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;

function preload() {
  this.load.tilemapTiledJSON("map", "./assets/map.json");
  this.load.spritesheet("tiles", "./assets/tiles.png", {
    frameWidth: 70,
    frameHeight: 70,
  });
  this.load.image("coin", "./assets/coinGold.png");
  this.load.atlas("player", "/assets/player.png", "./assets/player.json");
}
function create() {
  map = this.make.tilemap({ key: "map" });
  var groundTiles = map.addTilesetImage("tiles");
  groundLayer = map.createLayer("World", groundTiles, 0, 0);
  groundLayer.setCollisionByExclusion([-1]);
  this.physics.world.bounds.width = groundLayer.width;
  this.physics.world.bounds.height = groundLayer.height;

  player = this.physics.add.sprite(200, 200, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.physics.add.collider(groundLayer, player);

  cursors = this.input.keyboard.createCursorKeys();
}
function update() {
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200);
  }
  if ((cursors.space.isDown || cursors.up.isDown) && player.body.onFloor()) {
    player.body.setVelocityY(-500);
  }
}
