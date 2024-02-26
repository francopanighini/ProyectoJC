
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1; 
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_JUMP_R = 4;
const MARIO_STOP_JUMP_R = 5;
const MARIO_JUMP_L = 6;
const MARIO_STOP_JUMP_L = 7;
 

function Player(x, y, map)
{
	// Loading spritesheets
	var mario = new Texture("imgs/mario.png");

	// Prepare Bub sprite & its animations
	this.sprite = new Sprite(x, y, 32, 32, 7, mario);


	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_LEFT, [32, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [32, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [0, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [16, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_R, [32, 32, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STOP_JUMP_R, [32, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_L, [16, 32, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STOP_JUMP_L, [0, 16, 16, 16]);


	this.sprite.setAnimation(MARIO_STAND_RIGHT);
	
	// Set tilemap for collisions
	this.map = map;
	
	this.animjump = false;
	this.direccionjump = "R";

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;
}


Player.prototype.update = function(deltaTime)
{
	// Move Bub sprite left/right

	if(keyboard[37] && keyboard[38]) // KEY_LEFT
	{
		if(this.sprite.currentAnimation != MARIO_JUMP_L)
			this.sprite.setAnimation(MARIO_JUMP_L);
		this.sprite.x -= 2;
		if(this.map.collisionMoveLeft(this.sprite))
			this.sprite.x += 2;
		
		this.animjump = true;
		this.direccionjump = "L";
	
	}else if(keyboard[39] && keyboard[38]) // KEY_RIGHT
	{
		if(this.sprite.currentAnimation != MARIO_JUMP_R)
			this.sprite.setAnimation(MARIO_JUMP_R);
		this.sprite.x += 2;
		if(this.map.collisionMoveLeft(this.sprite))
			this.sprite.x -= 2;
	
		this.animjump = true;
		this.direccionjump ="R";
	
	}
	else if(keyboard[37]) // KEY_LEFT
	{
		if(this.sprite.currentAnimation != MARIO_WALK_LEFT)
			this.sprite.setAnimation(MARIO_WALK_LEFT);
		this.sprite.x -= 2;
		if(this.map.collisionMoveLeft(this.sprite))
			this.sprite.x += 2;
		this.direccionjump = "L";
	}
	else if(keyboard[39]) // KEY_RIGHT
	{
		if(this.sprite.currentAnimation != MARIO_WALK_RIGHT)
			this.sprite.setAnimation(MARIO_WALK_RIGHT);
		this.sprite.x += 2;
		if(this.map.collisionMoveRight(this.sprite))
			this.sprite.x -= 2;
		this.direccionjump = "R";
	}
	else if(keyboard[38]) // KEY_UP
	{
		if(this.sprite.currentAnimation != MARIO_JUMP_L)
			this.sprite.setAnimation(MARIO_JUMP_L);
			this.animjump = true;
		
	}
	else 
	{
		if(this.sprite.currentAnimation == MARIO_WALK_LEFT)
			this.sprite.setAnimation(MARIO_STAND_LEFT);
		if(this.sprite.currentAnimation == MARIO_WALK_RIGHT)
			this.sprite.setAnimation(MARIO_STAND_RIGHT);
	}




	
	if(this.bJumping)
	{
		this.jumpAngle += 4;
		if(this.jumpAngle == 180)
		{
			this.bJumping = false;
			this.sprite.y = this.startY;
			if(this.animjump){

				console.log(this.direccionjump );
				if (this.direccionjump == "R"){
					if(this.sprite.currentAnimation != MARIO_STOP_JUMP_R)
					this.sprite.setAnimation(MARIO_STOP_JUMP_R);
				}else{
					if(this.sprite.currentAnimation != MARIO_STOP_JUMP_L)
					this.sprite.setAnimation(MARIO_STOP_JUMP_L);
				}
				
				this.animjump = false;
			}
		}
		else
		{
			this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
			if(this.jumpAngle > 90){
				this.bJumping = !this.map.collisionMoveDown(this.sprite);
				
			}

		}
	}
	else
	{
		// Move Bub so that it is affected by gravity
		this.sprite.y += 2;
		if(this.map.collisionMoveDown(this.sprite))
		{
			//this.sprite.y -= 2;

			// Check arrow up key. If pressed, jump.
			if(keyboard[38])
			{
				this.bJumping = true;
				this.jumpAngle = 0;
				this.startY = this.sprite.y;
				/*if(this.sprite.currentAnimation != MARIO_JUMP)
					this.sprite.setAnimation(MARIO_JUMP);
					this.animjump = true;*/
			}/*else if(this.animjump){
				if(this.sprite.currentAnimation != MARIO_STOP_JUMP)
					this.sprite.setAnimation(MARIO_STOP_JUMP);
					this.animjump = false;
			}*/
		}
		
	}
	
	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.draw = function()
{
	this.sprite.draw();
}

Player.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	
	return box;
}




