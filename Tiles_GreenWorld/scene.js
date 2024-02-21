
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
	var mario = new Texture("imgs/mario.png");
	
	// Create tilemap
	this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01);

	this.marioSprite = new Sprite(100, 384, 32, 32, 7, mario);


	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_STAND_LEFT, [32, 16, 16, 16]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [32, 16, 16, 16]);
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [0, 16, 16, 16]);
	this.marioSprite.addKeyframe(MARIO_WALK_LEFT, [16, 16, 16, 16]);

	this.marioSprite.addAnimation();
	this.marioSprite.addKeyframe(MARIO_WALK_RIGHT, [0, 0, 16, 16]);
	this.marioSprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	this.marioSprite.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);

	this.marioSprite.setAnimation(MARIO_STAND_RIGHT);

	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{

	// Move Bub sprite
	if(keyboard[37]) // KEY_LEFT
	{


		if(this.marioSprite.currentAnimation != MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_WALK_LEFT);
		if(this.marioSprite.x >= 2)
			this.marioSprite.x -= 2;
	}
	else if(keyboard[39]) // KEY_RIGHT
	{


		if(this.marioSprite.currentAnimation != MARIO_WALK_RIGHT)
			this.marioSprite.setAnimation(MARIO_WALK_RIGHT);
		if(this.marioSprite.x < 480)
			this.marioSprite.x += 2;

	}
	else
	{

		
		if(this.marioSprite.currentAnimation == MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_STAND_LEFT);
		if(this.marioSprite.currentAnimation == MARIO_WALK_RIGHT)
			this.marioSprite.setAnimation(MARIO_STAND_RIGHT);
	}
	
	this.marioSprite.update(deltaTime);

	// Keep track of time
	this.currentTime += deltaTime;
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw tilemap
	this.map.draw();

	this.marioSprite.draw();
}



