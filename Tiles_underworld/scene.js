

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/lava.png");
	
	// Create tilemap
	this.pos = 0;

	this.map = new Tilemap(tilesheet, [16, 16], [6, 4], [this.pos, 0], lava);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(81, 81, 81)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	if (keyboard[65]) {
		this.pos = this.pos - 5;
		this.map.basePos = [this.pos,0]
		//context.translate(-32,0);
	}
	if (keyboard[68]) {
		this.pos = this.pos + 5;
		this.map.basePos = [this.pos,0]

		//context.translate(32,0);

	}	

	// Draw tilemap
	this.map.draw(); 
}



