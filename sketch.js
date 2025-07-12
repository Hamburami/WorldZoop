let tiles = [];

function setup() {
  createCanvas(500, 500);

  for (let x = 0; x <= 100; x++) {
    tiles[x] = [];
    for (let y = 0; y <= 100; y++) {
      tiles[x][y] = new Tile(x, y, (cos((PI*x)/50)+1)/2, (cos((PI*y)/50)+1)/2);
    }
  }
}

var x = 0;

function draw() {
  background(220);
  noStroke();

  for (let x = 0; x <= 100; x++) {
    for (let y = 0; y <= 100; y++) {
      tiles[x][y].show(5);
      rect(1, 100, 50, 50)
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
      fill(green);
    } else if(this.height > 0.5) {
      fill(tan);
    } else {
      fill(blue);
    }
    rect(x*tileSize, y*tileSize, tileSize, tileSize);
  }
}
