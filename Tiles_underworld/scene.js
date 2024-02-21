

// Scene. Updates and draws a single scene of the game.

const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;

const WALK_LEFT = 2;
const WALK_RIGHT = 3;

function Scene()
{
	// Loading texture to use in a TileMap
	var tilesheet = new Texture("imgs/lava.png");
	var mario = new Texture("imgs/mario.png");
	var goomba = new Texture("imgs/goomba.png");
	
	// Create tilemap
	this.pos = 0;

	this.movR = true;

	this.map = new Tilemap(tilesheet, [16, 16], [6, 4], [this.pos, 0], lava);


	this.marioSprite = new Sprite(64, 160, 32, 32, 7, mario);


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


	// Prepare goomba sprite & its animation
	this.goombaSprite = new Sprite(180, 224, 32, 32, 3, goomba);

	this.goombaSprite.addAnimation();
	this.goombaSprite.addKeyframe(0, [0, 0, 16, 16]);
	this.goombaSprite.addKeyframe(0, [16, 0, 16, 16]);

	this.goombaSprite.addKeyframe(WALK_RIGHT, [0, 0, 16, 16]);
	this.goombaSprite.addKeyframe(WALK_RIGHT, [16, 0, 16, 16]);

	this.goombaSprite.addAnimation();
	this.goombaSprite.addKeyframe(WALK_LEFT, [16, 0, 16, 16]);
	this.goombaSprite.addKeyframe(WALK_LEFT, [0, 0, 16, 16]);
	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{

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


	if(this.movR){
		if(this.goombaSprite.x >= 260){
			this.movR = false;
		}else{
			this.goombaSprite.x += 1;
		}
	}else{
		
		if(this.goombaSprite.x <= 180){
			this.movR = true;
		}else{
			this.goombaSprite.x -= 1;
		}
	}


	
	this.marioSprite.update(deltaTime);
	this.goombaSprite.update(deltaTime);
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

	this.goombaSprite.draw();

	this.marioSprite.draw();
}



