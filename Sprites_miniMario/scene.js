

const BUB_STAND_LEFT = 0;
const BUB_STAND_RIGHT = 1;
const BUB_WALK_LEFT = 2;
const BUB_WALK_RIGHT = 3;


const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1; 
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;


// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading spritesheets
	var bub = new Texture("imgs/bub.png");
	var bubble = new Texture("imgs/bubble.png");
	var mario = new Texture("imgs/mario.png");

	// Prepare Bub sprite & its animations
	this.bubSprite = new Sprite(224, 224, 32, 32, 7, bub);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_STAND_LEFT, [0, 0, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_STAND_RIGHT, [32, 0, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_WALK_LEFT, [0, 0, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_LEFT, [0, 32, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_LEFT, [0, 64, 32, 32]);

	this.bubSprite.addAnimation();
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT, [32, 0, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT, [32, 32, 32, 32]);
	this.bubSprite.addKeyframe(BUB_WALK_RIGHT, [32, 64, 32, 32]);

	this.bubSprite.setAnimation(BUB_STAND_RIGHT);
	
	// Prepare bubble sprite & its animation
	this.bubbleSprite = new Sprite(400, 160, 32, 32, 3, bubble);

	this.bubbleSprite.addAnimation();
	this.bubbleSprite.addKeyframe(0, [0, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [16, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [32, 0, 16, 16]);
	this.bubbleSprite.addKeyframe(0, [48, 0, 16, 16]);


	this.marioSprite = new Sprite(100, 100, 32, 32, 7, mario);


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
	// Keep track of time
	this.currentTime += deltaTime;
	
	// Move Bub sprite
	if(keyboard[37]) // KEY_LEFT
	{
		if(this.bubSprite.currentAnimation != BUB_WALK_LEFT)
			this.bubSprite.setAnimation(BUB_WALK_LEFT);
		if(this.bubSprite.x >= 2)
			this.bubSprite.x -= 2;

		if(this.marioSprite.currentAnimation != MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_WALK_LEFT);
		if(this.marioSprite.x >= 2)
			this.marioSprite.x -= 2;
	}
	else if(keyboard[39]) // KEY_RIGHT
	{
		if(this.bubSprite.currentAnimation != BUB_WALK_RIGHT)
			this.bubSprite.setAnimation(BUB_WALK_RIGHT);
		if(this.bubSprite.x < 480)
			this.bubSprite.x += 2;

		if(this.marioSprite.currentAnimation != MARIO_WALK_RIGHT)
			this.marioSprite.setAnimation(MARIO_WALK_RIGHT);
		if(this.marioSprite.x < 480)
			this.marioSprite.x += 2;

	}
	else
	{
		if(this.bubSprite.currentAnimation == BUB_WALK_LEFT)
			this.bubSprite.setAnimation(BUB_STAND_LEFT);
		if(this.bubSprite.currentAnimation == BUB_WALK_RIGHT)
			this.bubSprite.setAnimation(BUB_STAND_RIGHT);
		
		if(this.marioSprite.currentAnimation == MARIO_WALK_LEFT)
			this.marioSprite.setAnimation(MARIO_STAND_LEFT);
		if(this.marioSprite.currentAnimation == MARIO_WALK_RIGHT)
			this.marioSprite.setAnimation(MARIO_STAND_RIGHT);
	}
	
	// Update sprites
	this.bubSprite.update(deltaTime);
	this.bubbleSprite.update(deltaTime);
	this.marioSprite.update(deltaTime);

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

	this.marioSprite.draw();
}



