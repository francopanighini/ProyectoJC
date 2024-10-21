

function Bandera(x, y, map, dir) {
	var bubble = new Texture("imgs/CompleteTilesheetLvl1.png");

	// Prepare bubble sprite & its animation
	this.sprite = new Sprite(x, y, 16, 16, 3, bubble);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [16, 80, 16, 16]);

	this.activa = true;
	this.bajar = false;
	this.map = map;
	this.direccion = dir;
}


Bandera.prototype.update = function update(deltaTime) {
	if (this.bajar)
		if (this.sprite.y < (24 * 16))
			this.sprite.y += 1;

	this.sprite.update(deltaTime);
}

Bandera.prototype.draw = function draw() {
	this.sprite.draw();
}

Bandera.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}