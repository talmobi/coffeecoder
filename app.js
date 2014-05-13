var canvas = document.createElement('canvas');
var stage = new createjs.Stage(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

stage.regX = .5;
stage.regY = .5;

window.onresize = updateSize;
function updateSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

document.body.appendChild(canvas);

function Border(x,y,w,h,color) {
  var s = new createjs.Shape();
  s.snapToPixel = true;
  s.x = x;
  s.y = y;
  s.w = w;
  s.h = h;
  s.graphics.setStrokeStyle(1).beginStroke(color || "white").rect(0,0,w,h);
  return s;
}

var border = new Border(1,1,canvas.width - 1, canvas.height - 1)
stage.addChild( border );


var queue = new createjs.LoadQueue(false);
var manifest = [
  {id: 'bg', src: 'assets/bg_sm_mod.jpg'},
  {id: 'mug', src: 'assets/mug.jpg'},
  {id: 'screen', src: 'assets/screen.jpg'}
];
queue.loadManifest(manifest);
queue.on('complete', init);

var width = 500;
var height = width * 9 / 16;

function init() {

  var mouseX = 0;
  var mouseY = 0;
  var scale = queue.getResult('bg').width / width;
  
  var bg = new createjs.Bitmap( queue.getResult('bg') );
  bg.scaleX = bg.scaleY = scale;
  bg.regX = 0;
  bg.regY = 0;
  stage.addChild(bg);


  stage.update();

  createjs.Ticker.setFPS(30);
  createjs.Ticker.on('tick', tick);

  stage.on('stagemousemove', function(evt) {
    mouseX = evt.stageX;
    mouseY = evt.stageY;
  })

  function tick() {
    var x = mouseX / window.innerWidth * bg.image.width * scale - bg.image.width * scale / 2;
    var y = mouseY / window.innerHeight * bg.image.height * scale - bg.image.height * scale / 2;
    x += bg.image.width * scale / 6;

    bg.x = x - bg.image.width / 2 * scale;
    bg.y = y - bg.image.height / 2 * scale;
    if (bg.y + bg.image.height * scale < window.innerHeight) {
      bg.y = window.innerHeight - (bg.image.height * scale);
    }
    if (bg.x + bg.image.width * scale < window.innerWidth) {
      bg.x = window.innerWidth - (bg.image.width * scale);
    }
    if (bg.x > 0) {
      bg.x = 0;
    }
    if (bg.y > 0) {
      bg.y = 0;
    }

    stage.update();
  }
}

