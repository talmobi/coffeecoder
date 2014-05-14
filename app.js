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

var p = document.createElement('pre');
p.style.position = 'absolute';
p.style.top = 0;
p.style.left = 0;
var text = "bash>"
var del = ' |';
var delToggle = false;
p.innerHTML = text;
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


var queue = new createjs.LoadQueue(false);
var manifest = [
  // gfx
  {id: 'bg', src: 'assets/bg_sm_mod.jpg'},
  {id: 'mug', src: 'assets/mug.jpg'},
  {id: 'screen', src: 'assets/screen.jpg'},
  {id: 'code'
  , src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js'
  , type: createjs.LoadQueue.TEXT},
  // sfx
  {id: 'sndType1', src: 'assets/sfx/type1.mp3'},
  {id: 'sndType2', src: 'assets/sfx/type2.mp3'},
  {id: 'sndType3', src: 'assets/sfx/type3.mp3'},
  {id: 'sndType4', src: 'assets/sfx/type4.mp3'},

  {id: 'sndEnter1', src: 'assets/sfx/enter1.mp3'},
  {id: 'sndEnter2', src: 'assets/sfx/enter2.mp3'},
  {id: 'sndEnter3', src: 'assets/sfx/enter3.mp3'},
  {id: 'sndEnter4', src: 'assets/sfx/enter4.mp3'},

  {id: 'sndSpace1', src: 'assets/sfx/space1.mp3'},
  {id: 'sndSpace2', src: 'assets/sfx/space2.mp3'},
  {id: 'sndSpace3', src: 'assets/sfx/space3.mp3'},
  {id: 'sndSpace4', src: 'assets/sfx/space4.mp3'},
  {id: 'sndSpace5', src: 'assets/sfx/space5.mp3'},

  {id: 'sndShift', src: 'assets/sfx/shift.mp3'},
  {id: 'sndCtrl', src: 'assets/sfx/ctrl.mp3'},

];
queue.installPlugin(createjs.Sound); // install sound plugin
queue.loadManifest(manifest);
queue.on('complete', init);

var width = 500;
var height = width * 9 / 16;

function init() {

  //console.log(queue.getResult('code'));

  (function toggleDelimeter() {
    delToggle = !delToggle;
    setTimeout(toggleDelimeter, 500);
  })();

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
  });

  var codeString = queue.getResult('code');
  var strlen = codeString.length;
  var count = 0;
  var lines = 0;

  // load sounds intro lists
  var sndEnter = [
    'sndEnter1',
    'sndEnter2',
    'sndEnter3',
    'sndEnter4'
  ];

  var sndType = [
    'sndType1',
    'sndType2',
    'sndType3',
    'sndType4'
  ];

  var sndSpace = [
    'sndSpace1',
    'sndSpace2',
    'sndSpace3',
    //'sndSpace4', // too loud
    'sndSpace5'
  ];

  var sndShift = [
    'sndShift'
  ];

  var sndCtrl = [
    'sndCtrl'
  ];

  var delay = 2;
  var tmpDelay = 220;
  var ticks = 0;
  var l = ''; // last char

  function parseCode() {
    ticks++;
    if (ticks < delay + tmpDelay) {
      return;
    }
    ticks = 0;
    tmpDelay = 0;

    //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js

    if (count < strlen) {
      var c = codeString[count++];
      if (c == '\n' && l == '\n') tmpDelay = 25; 
      text += c;
      if (c.match(/[\n]/)) {
        lines++;
        createjs.Sound.play( sndEnter[Math.random() * sndEnter.length | 0] );

        if (lines > 25) {
          // delete first line to make room for more
          var pos = text.indexOf('\n');
          text = text.substring( pos + 1);
        }
      } else {
        if (c == ' ') {
          tmpDelay = 2;
          createjs.Sound.play( sndSpace[Math.random() * sndSpace.length | 0] );
        } else {
          // play shift if upper case and last wasn't upper case
          if (c.match(/[A-Z]/) && !l.match(/[A-Z]/)) {
            createjs.Sound.play( sndShift[Math.random() * sndShift.length | 0] );
          }


          createjs.Sound.play( sndType[Math.random() * sndType.length | 0] );
        }
      }

      l = c;
    } // if (count < strlen)
  }

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

    // udate text
    p.style.left = (bg.x + 945 * scale);
    p.style.top = (bg.y + 382 * scale);

    p.innerHTML = text;
    if (delToggle) {
      p.innerHTML += del;
    }

    parseCode();

    stage.update();
  }
}

