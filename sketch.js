let tiles = [];

function setup() {
  createCanvas(500, 500);
  // optional: frameRate(10);

  for (let x = 0; x <= 100; x++) {
    tiles[x] = [];
    for (let y = 0; y <= 100; y++) {
      // store the coordinates in each Tile
      tiles[x][y] = new Tile(
        x,
        y,
        (cos((PI * x) / 50) + 1) / 2,
        (cos((PI * y) / 50) + 1) / 2
      );
    }
  }
}

function draw() {
  background(220);
  noStroke();

  for (let x = 0; x <= 100; x++) {
    for (let y = 0; y <= 100; y++) {
      tiles[x][y].show(5);
    }
  }
}

class Tile {
  constructor(x, y, h, p) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.perc = p;
  }

  show(tileSize) {
    if (this.height > 0.6) {
      fill(color("green"));
    } else if (this.height > 0.5) {
      fill(color("tan"));
    } else {
      fill(color("blue"));
    }
    // use the tile’s own coordinates
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
}
