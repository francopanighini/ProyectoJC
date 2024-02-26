

function Goomba(x, y)
{
	var goomba = new Texture("imgs/goomba.png");

	this.movR = true;

	// Prepare goomba sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, goomba);


	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
}


Goomba.prototype.update = function update(deltaTime)
{

	// if(this.movR){
	// 	if(this.sprite.x >= 260){
	// 		this.movR = false;
	// 	}else{
	// 		this.sprite.x += 1;
	// 	}
	// }else{
		
	// 	if(this.sprite.x <= 180){
	// 		this.movR = true;
	// 	}else{
	// 		this.sprite.x -= 1;
	// 	}
	// }

	// Move the Goomba to the left
    this.sprite.x -= 1;

    // Check if the Goomba has left the map
    if (this.sprite.x < -32) {
        //this.sprite.destroy();
    }

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




