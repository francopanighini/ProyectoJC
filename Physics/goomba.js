const GOOMBA_VIVO = 0;
const GOOMBA_MUERTO = 1;
//dir = true izquierda, false derecha
function Goomba(x, y, map, dir)
{
	var goomba = new Texture("imgs/goomba.png");

	this.movR = true;

	// Prepare goomba sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, goomba);


	this.sprite.addAnimation();
	this.sprite.addKeyframe(GOOMBA_VIVO, [0, 0, 16, 16]);
	this.sprite.addKeyframe(GOOMBA_VIVO, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(GOOMBA_MUERTO, [0, 16, 16, 16]);


	this.sprite.setAnimation(GOOMBA_VIVO);
	this.muerto = false;

	this.map = map;

	this.direccion = dir;
}


Goomba.prototype.update = function update(deltaTime)
{


	if(!this.muerto){
		// Move the Goomba to the left

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


			
	}else{
		this.sprite.setAnimation(GOOMBA_MUERTO);
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




