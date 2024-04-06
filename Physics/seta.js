

function Seta(x, y,map,dir)
{
	var bubble = new Texture("imgs/varied.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 32, 32, 32]);

	this.activa = false;


	this.map = map;

	this.direccion = dir;
}


Seta.prototype.update = function update(deltaTime)
{
	if(this.activa){
		

		if(this.direccion){
			this.sprite.x += 1;
		}else{
			this.sprite.x -= 1;
		}


		this.sprite.y += 4;


		this.map.collisionMoveDown(this.collisionBox(), this.sprite);


		if ((this.map.collisionMoveRight(this.collisionBox()))
		|| (this.map.collisionMoveLeft(this.collisionBox()))){
			this.direccion = !this.direccion;
		}


			
	}
	

	this.sprite.update(deltaTime);
}

Seta.prototype.draw = function draw()
{
	this.sprite.draw();
}

Seta.prototype.collisionBox = function()
{
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);
	
	return box;
}




