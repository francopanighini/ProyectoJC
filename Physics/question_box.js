function Question_Box(x, y) {
	var question_box = new Texture("imgs/question_box.png");

	// Prepare question_box sprite & its animation
	this.sprite = new Sprite(x, y, 16, 16, 3, question_box);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(0, [0, 0, 16, 16]);
	this.sprite.addKeyframe(0, [16, 0, 16, 16]);
	this.sprite.addKeyframe(0, [32, 0, 16, 16]);
}

Question_Box.prototype.update = function update(deltaTime) {
	this.sprite.update(deltaTime);
}

Question_Box.prototype.draw = function draw() {
	this.sprite.draw();
}

Question_Box.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height);
	// var box = new Box(this.sprite.x + 2, this.sprite.y + 2, this.sprite.x + this.sprite.width - 4, this.sprite.y + this.sprite.height - 4);

	return box;
}