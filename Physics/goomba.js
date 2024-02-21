

function Goomba(x, y)
{
	var goomba = new Texture("imgs/goomba.png");

	// Prepare goomba sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, goomba);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
}


Goomba.prototype.update = function update(deltaTime)
{
	this.sprite.update(deltaTime);
}

Goomba.prototype.draw = function draw()
{
	this.sprite.draw();
}

Goomba.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




