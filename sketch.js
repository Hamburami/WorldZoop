let tiles = [];
let resolution = 200
let canvasSize = 800

let cutOff = 0.56
let noiseScale_height = 0.04
let noiseScale = 0.2


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
      let mask = min(pow(1.7*(sin(PI*x/(resolution))+1)*(sin(PI*y/(resolution))+1)/4,6 )-0.45,1);
      tiles[x][y] = new Tile(x,y, 
        noise(noiseScale_height*x, noiseScale_height*y)*mask,
       noise(noiseScale*x, noiseScale*y)*mask, // 
       (cos(PI*(y-resolution/2)/(resolution/2))+1)/2);
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
  constructor(x, y, h, p, t) {
    this.x = x;
    this.y = y;
    this.height = h;
    this.perc = p;
    this.temp = t;

    // climate determination
    if (this.temp < 0.2)
      this.climate = 'polar';
    else {
      if (this.perc < 0.2) {
        this.climate = 'desert'; //need an option for grassland
      } else {
        if (this.temp < 0.4) {
          this.climate = 'continental';
        } else if (this.temp < 0.8){
          if (this.perc < 0.7) {
            this.climate = 'forest';
          } else { //vvv High percipitation medium tempature vvv
            this.climate = 'temperate_rainforest'
          }
        } else { //highest temp
          if (this.perc > 0.7) {
            this.climate = 'rainforest'
          } else {
            this.climate = 'savanna'
          }
        }
      }
    }

    if (this.height < cutOff) {
      this.climate = 'ocean'
    } else if (this.height < cutOff + 0.02)  {
      this.climate = 'beach'
    }else if(this.height > 0.7) {
      if (this.height < 0.8) {
        this.climate = 'mountain_base'
      } else {
        this.climate = 'mountain_peak'
      }
    }
  }

  show(tileSize) {
    switch (this.climate) {
      case 'polar':
        fill (color(220, 220, 255));
        break;
      case 'desert':
        fill(color(255, 220, 115));
        break;
      case 'continental':
        fill(color(175,210,130));
        break;
      case 'forest':
        fill(color(60,160,65));
      case 'temperate_rainforest':
        fill(color(50, 140, 30));
        break;
      case 'rainforest':
        fill(color(0, 120, 40));
        break;
      case 'savanna':
        fill(color(200, 220, 20));
        break;
      case 'ocean':
        fill(color(14, 73, 210));
        break;
      case 'mountain_base':
        fill(color(140, 122, 80));
        break;
      case 'mountain_peak':
        fill(color('white'));
        break;
      case 'beach':
        fill(color(252,226,165));
        break;

    }
    
    // fill(color(this.height*255,0,0));
    // use the tile’s own coordinates
    rect(this.x * tileSize, this.y * tileSize, tileSize, tileSize);
  }
}

