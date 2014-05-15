var canvas = document.createElement('canvas');
var stage = new createjs.Stage(canvas);

var width = 500;
var height = width * 9 / 16;

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

var p = document.createElement('pre');
p.style.position = 'absolute';
p.style.top = 0;
p.style.left = 0;

p.innerHTML = 'default text';
document.body.appendChild(p);

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


  stage.on('stagemousemove', function(evt) {
    mouseX = evt.stageX;
    mouseY = evt.stageY;
  });
}