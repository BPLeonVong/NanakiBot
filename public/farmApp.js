/*var plant = function(x, y, sprite, plantName, plantValue, plantTimer, plantOwner) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.plantName = plantName;
    this.plantValue = plantValue;
    this.plantTimer = plantTimer;
    this.plantOwner = plantOwner;
}

var field = function(x, y, sprite, plant) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.plant = plant;
}

field.prototype.render = function(){
    console.log("Rendering " + this.x + " "  + ctx + " " + canvas);
    ctx.fillRect(this.x, this.y, 50, 50);
}

var fields = {};

function drawImages() {
    var canvas = document.getElementById('app');
    var ctx = canvas.getContext('2d');

    ctx.drawImage(images[0], 0, 0, window.innerWidth, window.innerHeight);

    fields.forEach(function(field) {
	field.render();
    });
}*/

/*
  Pre-loads the images so they can be drawn in order.
*/
/*function loadImages() {
  var sources = ["", ""]
  var loadedImages = 0;

  for (var src in sources) {
  images[src] = new Image();
  images[src].onload = function() {
  if(++loadedImages >= 2) {
  drawImages();
  }
  };
  images[src].src = sources[src];
  }
  }*/

/*
  Draws the map and all the current chatroom locations onto the canvas.
*/

