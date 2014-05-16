
var globalTicks = 0;
var lastTypedTime = 0;
var text = "Mollie@MOLLIE-PC ~/workspace/coffeecoder (master) \n$ "
var del = ' _';
var curToggle = false;
var p = document.createElement('pre');
p.className = "code"
document.body.appendChild(p);

// preload assets
var queue = new createjs.LoadQueue(false);
var manifest = [
  // gfx
  //{id: 'bg', src: 'assets/bg_sm.jpg'},
  //{id: 'mug', src: 'assets/mug.jpg'},
  //{id: 'screen', src: 'assets/screen.jpg'},
  {id: 'code1'
  , src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js'
  , type: createjs.LoadQueue.TEXT},

  // sfx
  {id: 'sndHum', src: 'assets/sfx/hum.mp3'},

  {id: 'sndType1', src: 'assets/sfx/type1.mp3'},
  {id: 'sndType2', src: 'assets/sfx/type2.mp3'},
  {id: 'sndType3', src: 'assets/sfx/type3.mp3'},
  {id: 'sndType4', src: 'assets/sfx/type4.mp3'},
  {id: 'sndType5', src: 'assets/sfx/type5.mp3'},
  {id: 'sndType6', src: 'assets/sfx/type6.mp3'},
  {id: 'sndType7', src: 'assets/sfx/type7.mp3'},
  {id: 'sndType8', src: 'assets/sfx/type8.mp3'},
  {id: 'sndType9', src: 'assets/sfx/type9.mp3'},
  {id: 'sndType10', src: 'assets/sfx/type10.mp3'},
  {id: 'sndType11', src: 'assets/sfx/type11.mp3'},
  {id: 'sndType12', src: 'assets/sfx/type12.mp3'},
  {id: 'sndType13', src: 'assets/sfx/type13.mp3'},
  {id: 'sndType14', src: 'assets/sfx/type14.mp3'},
  {id: 'sndType15', src: 'assets/sfx/type15.mp3'},

  {id: 'sndTab1', src: 'assets/sfx/tab1.mp3'},
  {id: 'sndTab2', src: 'assets/sfx/tab2.mp3'},

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
  {id: 'sndCtrl', src: 'assets/sfx/ctrl.mp3'}

];
queue.installPlugin(createjs.Sound); // install sound plugin
queue.loadManifest(manifest); 
queue.on('complete', init);

function init() {

  //console.log(queue.getResult('code'));

  // toggle cursor automatically
  (function toggleCursor() {
    curToggle = !curToggle;
    if (globalTicks < lastTypedTime + 10)
      curToggle = true;
    setTimeout(toggleCursor, 400);
  })();

  createjs.Ticker.setFPS(30);
  createjs.Ticker.on('tick', tick);


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
    'sndType4',
    'sndType5',
    'sndType6',
    'sndType7',
    'sndType8',
    'sndType9',
    'sndType10',
    'sndType11',
    'sndType12',
    'sndType13',
    'sndType14',
    'sndType15'
  ];

  var sndSpace = [
    'sndSpace1',
    'sndSpace2',
    'sndSpace3',
    //'sndSpace4', // too loud
    'sndSpace5'
  ];

  var sndMod = [
    'sndShift'
    //'sndCtrl'
  ];

  var sndTab = [
    'sndTab1',
    'sndTab2'
  ];

  // play soft humming sound on loop
  var sndHum = 'sndHum';
  //createjs.Sound.play(sndHum);
  createjs.Sound.play(sndHum, {loop: -1, delay: 0, volume: .4});
  //createjs.Sound.play(sndHum, {loop: -1, delay: 6000, volume: .4});

  var codeString = "" + queue.getResult('code1');
  codeString = '\n\n' + codeString;
  var strlen = codeString.length;
  var count = 0;
  var lines = 0;

  var delay = 3;
  var tmpDelay = 160;
  var ticks = 0;
  var l = '\n'; // last char
  var first = true;
  var shiftMatch = /[A-Z&\/^)();:\-_\?!@$=*\"%#£€]/;

  function parseCode() {
    ticks++;
    if (ticks < delay + tmpDelay) {
      return;
    }
    lastTypedTime = globalTicks;
    ticks = 0;
    tmpDelay = 0;

    //cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.js

    if (count < strlen) {
      var c = codeString[count++];
      if (c == '\n' && l == '\n') tmpDelay = 25;
      if (c == '\n' && l == '}') tmpDelay = 55;
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
        } if (c == '\t') {
          createjs.Sound.play( sndTab[Math.random() * sndTab.length | 0] );
        } else {
          // play shift if upper case and last wasn't upper case
          if (c.match(shiftMatch) && !l.match(shiftMatch)) {
            createjs.Sound.play( sndMod[Math.random() * sndMod.length | 0] );
          }


          createjs.Sound.play( sndType[Math.random() * sndType.length | 0] );
        }
      }

      l = c;
    } // if (count < strlen)

    /*if (tmpDelay > 0) {
      createjs.Sound.play(sndHum);
    }*/
  }

  function updatePositions() {
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

    // update text
    p.style.left = (bg.x + 945 * scale);
    p.style.top = (bg.y + 382 * scale);
  }

  function tick() {
    //updatePositions();
    globalTicks++;

    p.innerHTML = text;
    if (curToggle) {
      p.innerHTML += del;
    }

    parseCode();
  }
}

