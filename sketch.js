let tiles = [];
let noiseScale = 0.01
let resolution = 300
let canvasSize = 800

function setup() {
  createCanvas(canvasSize, canvasSize);
  noiseDetail(12, 0.5);

  for (let x = 0; x <= resolution; x++) {
    tiles[x] = [];
    for (let y = 0; y <= resolution; y++) {
      // store the coordinates in each Tile
      tiles[x][y] = new Tile(x,y, noise(noiseScale*x, noiseScale*y), 0);
    }
  }
}

function draw() {
  background(220);
  noStroke();

  for (let x = 0; x <= resolution; x++) {
    for (let y = 0; y <= resolution; y++) {
      tiles[x][y].show(canvasSize/resolution);
    }
  }
}

let cutOff = 0.5

class Tile {
  constructor(x, y, h, p) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.perc = p;
  }

  show(tileSize) {
    if (this.height > cutOff) {
      fill(color("green"));
    } else if (this.height > cutOff -0.05) {
      fill(color("tan"));
    } else {
      fill(color("blue"));
    }
    // use the tile’s own coordinates
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
}
