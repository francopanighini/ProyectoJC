
// Main class. Executes the game loop, redrawing the scene as needed.

const FRAME_RATE = 60;
const TIME_PER_FRAME = 1000 / FRAME_RATE;

var sceneNormal = new SceneNormal(); //Jugar nivel normal
var sceneLava = new SceneLava(); //Jugar nivel lava
//Añadir pantalla de underworld
var start = new SceneStart();
var instrc = new SceneInstrucciones();
var cred = new SceneCreditos();
var previousTimestamp;
var keyboard = [];
var interacted;
var soltar = false;
var hurryMusic = false;

var scen = [sceneNormal,cred,instrc,start,sceneLava];




// Control keyboard events

function keyDown(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = true;
		soltar=false;
}

function keyUp(keycode)
{
	if(keycode.which >= 0 && keycode.which < 256)
		keyboard[keycode.which] = false;
		soltar = true;
}

function click()
{
	interacted = true;
}

// Initialization

function init()
{
	for(var i=0; i<256; i++)
		keyboard.push(false);
	document.body.addEventListener('keydown', keyDown);
	document.body.addEventListener('keyup', keyUp);
	document.body.addEventListener('click', click);
	previousTimestamp = performance.now();
	interacted = false;
}

// Game loop: Update, draw, and request a new frame

function frameUpdate(timestamp)
{
	var a = activa;
	var bUpdated = false;
	var deltaTime = timestamp - previousTimestamp;
	
	while(deltaTime > TIME_PER_FRAME)
	{
		bUpdated = true;
		scen[a].update(TIME_PER_FRAME);
		previousTimestamp += TIME_PER_FRAME;
		deltaTime = timestamp - previousTimestamp;
	}
	if(bUpdated)
		scen[a].draw();
	
	window.requestAnimationFrame(frameUpdate)
	
}


// Init and launch game loop
init();
frameUpdate(previousTimestamp);

