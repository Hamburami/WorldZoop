let tiles = [];
let resolution = 200
let canvasSize = 800

let cutOff = 0.6
let noiseScale = 0.04

function setup() {
  createCanvas(canvasSize, canvasSize);
  noiseDetail(12, 0.5);

  for (let x = 0; x <= resolution; x++) {
    tiles[x] = [];
    for (let y = 0; y <= resolution; y++) {
      // store the coordinates in each Tile
      // let d = sqrt((resolution/2 + x)**2 + (resolution/2 + y)**2);
      // if (d < 10) {
      //   let e = noise(noiseScale*x, noiseScale*y);
      // } else {
      //   let e = 0;
      // }
      tiles[x][y] = new Tile(x,y, noise(noiseScale*x, noiseScale*y) * min(pow(1.7*(sin(PI*x/(resolution))+1)*(sin(PI*y/(resolution))+1)/4,6 )-0.45, 1), 0);
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
    
    // fill(color(this.height*255,0,0));
    // use the tile’s own coordinates
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
}
