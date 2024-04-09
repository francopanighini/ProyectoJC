const KOOPA_VIVO_D = 0;
const KOOPA_VIVO_I = 1;
const KOOPA_CAPARAZON = 2;
//dir = true izquierda, false derecha
function Koopa(x, y, map, dir) {
	var koopa = new Texture("imgs/koopa.png");

	// Prepare goomba sprite & its animation
	this.sprite = new Sprite(x, y, 32, 32, 3, koopa);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(KOOPA_VIVO_D, [0, 0, 16, 24]);
	this.sprite.addKeyframe(KOOPA_VIVO_D, [16, 0, 16, 24]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(KOOPA_VIVO_I, [0, 24, 16, 24]);
	this.sprite.addKeyframe(KOOPA_VIVO_I, [16, 24, 16, 24]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(KOOPA_CAPARAZON, [32, 0, 16, 16]);

	if (dir)
		this.sprite.setAnimation(KOOPA_VIVO_I);
	else
		this.sprite.setAnimation(KOOPA_VIVO_D);

	this.caparazon = false;
	this.map = map;
	this.direccion = dir;
	this.dirCap = "Abajo";

}

Koopa.prototype.update = function update(deltaTime) {
	if (!this.caparazon) {
		// Move the Goomba to the left
		if (this.direccion) {
			this.sprite.x += 1;
			this.sprite.setAnimation(KOOPA_VIVO_I);
		} else {
			this.sprite.x -= 1;
			this.sprite.setAnimation(KOOPA_VIVO_D);
		}
	} else {
		this.sprite.setAnimation(KOOPA_CAPARAZON);

		if (this.dirCap != "Abajo") {
			if (this.direccion)
				this.sprite.x -= 3;
			else
				this.sprite.x += 3;
		}
	}

	this.sprite.y += 4;

	this.map.collisionMoveDown(this.collisionBox(), this.sprite);

	if ((this.map.collisionMoveRight(this.collisionBox()))
		|| (this.map.collisionMoveLeft(this.collisionBox()))) {
		this.direccion = !this.direccion;
	}

	this.sprite.update(deltaTime);
}

Koopa.prototype.draw = function draw() {
	this.sprite.draw();
}

Koopa.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}