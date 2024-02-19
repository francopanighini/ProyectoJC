

const STAND_LEFT = 0;
const STAND_RIGHT = 1;
const WALK_LEFT = 2;
const WALK_RIGHT = 3;


// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading spritesheets
	var bub = new Texture("imgs/bub.png");
	var bubble = new Texture("imgs/bubble.png");
	var goomba = new Texture("imgs/goomba.png");


	// Prepare Bub sprite & its animations
	this.bubSprite = new Sprite(224, 224, 32, 32, 7, bub);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(STAND_LEFT, [0, 0, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(STAND_RIGHT, [32, 0, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(WALK_LEFT, [0, 0, 32, 32]);
	this.bubSprite.addKeyframe(WALK_LEFT, [0, 32, 32, 32]);
	this.bubSprite.addKeyframe(WALK_LEFT, [0, 64, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(WALK_RIGHT, [32, 0, 32, 32]);
	this.bubSprite.addKeyframe(WALK_RIGHT, [32, 32, 32, 32]);
	this.bubSprite.addKeyframe(WALK_RIGHT, [32, 64, 32, 32]);

	this.bubSprite.setAnimation(STAND_LEFT);
	
	// Prepare bubble sprite & its animation
	this.bubbleSprite = new Sprite(400, 160, 32, 32, 3, bubble);

	this.bubbleSprite.addAnimation();
	this.bubbleSprite.addKeyframe(0, [0, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [16, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [32, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [48, 0, 16, 16]);
	
	// Prepare goomba sprite & its animation
	this.goombaSprite = new Sprite(100, 100, 32, 32, 3, goomba);

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
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Move Bub sprite
	if(keyboard[37]) // KEY_LEFT
	{
		if(this.bubSprite.currentAnimation != WALK_LEFT)
			this.bubSprite.setAnimation(WALK_LEFT);
		if(this.bubSprite.x >= 2)
			this.bubSprite.x -= 2;

		if(this.goombaSprite.currentAnimation != WALK_LEFT)
			this.goombaSprite.setAnimation(WALK_LEFT);
		if(this.goombaSprite.x >= 2)
			this.goombaSprite.x -= 1;
	}
	else if(keyboard[39]) // KEY_RIGHT
	{
		if(this.bubSprite.currentAnimation != WALK_RIGHT)
			this.bubSprite.setAnimation(WALK_RIGHT);
		if(this.bubSprite.x < 480)
			this.bubSprite.x += 2;

		if(this.goombaSprite.currentAnimation != WALK_RIGHT)
			this.goombaSprite.setAnimation(WALK_RIGHT);
		if(this.goombaSprite.x < 480)
			this.goombaSprite.x += 1;
	}
	else
	{
		if(this.bubSprite.currentAnimation == WALK_LEFT)
			this.bubSprite.setAnimation(STAND_LEFT);
		if(this.bubSprite.currentAnimation == WALK_RIGHT)
			this.bubSprite.setAnimation(STAND_RIGHT);

		if(this.goombaSprite.currentAnimation == WALK_LEFT)
			this.goombaSprite.setAnimation(STAND_LEFT);
		if(this.goombaSprite.currentAnimation == WALK_RIGHT)
			this.goombaSprite.setAnimation(STAND_RIGHT);
	}
	
	// Update sprites
	this.bubSprite.update(deltaTime);
	this.bubbleSprite.update(deltaTime);
	this.goombaSprite.update(deltaTime);
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw bub sprite
	this.bubSprite.draw();
		
	// Draw enemy captured in a bubble sprite
	this.bubbleSprite.draw();

	// Draw goomba sprite
	this.goombaSprite.draw();
}



