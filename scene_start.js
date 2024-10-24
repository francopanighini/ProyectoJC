// Scene. Updates and draws a single scene of the game.
function SceneStart() {
	// Loading texture to use in a TexturedQuad
	var img = new Texture("imgs/start.png");
	var img2 = new Texture("imgs/varied.png");

	this.coin = new Coin(165, 50);

	this.selec = [70 + 140, 105 + 140, 130 + 150];
	this.i = 2;
	this.setaQuad = new TexturedQuad(0, 32, 32, 32, 280, this.selec[this.i], 65, 65, img2);

	this.start = new TexturedQuad(0, 0, 512, 448, 0, 0, 512, 448, img);

	this.u = 0;
	// Store current time
	this.currentTime = 0
}

SceneStart.prototype.update = function (deltaTime) {
	if (keyboard[49]) {
		this.i = 0;
		this.setaQuad.y = this.selec[this.i];
	}
	if (keyboard[50]) {
		this.i = 1;
		this.setaQuad.y = this.selec[this.i];
	}
	if (keyboard[51]) {
		this.i = 2;
		this.setaQuad.y = this.selec[this.i];
	}

	// Keep track of time
	this.currentTime += deltaTime;

	// Update entities
	this.coin.update(deltaTime);
	// this.question_box.update(deltaTime);
}

SceneStart.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(199, 253, 255)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw entities
	context.save();
	this.start.draw();
	this.coin.draw();
	// this.question_box.draw();
	context.restore();

	context.save();
	this.setaQuad.draw();
	context.restore();

	// Draw text
	var text = "TIME";
	context.font = "18px mario";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	// right side of the screen
	context.fillText(text, 400, 48);

	// text = Math.floor(400 - this.currentTime / 1000);
	// var textSize = context.measureText(text);
	// if(textSize.width < 20)
	// 	context.fillText(text, 454, 48 + 24);
	// else if(textSize.width < 40)
	// 	context.fillText(text, 436, 48 + 24);
	// else
	// 	context.fillText(text, 418, 48 + 24);

	// Draw text
	var text = "WORLD";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 286, 48);

	text = "1-1";
	var textSize = context.measureText(text);
	context.fillText(text, 286, 48 + 24);

	// Draw text
	var text = "x00";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 190, 48 + 24);

	// Draw text
	var text = "MARIO";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 32, 48);

	text = "000000";
	var textSize = context.measureText(text);
	context.fillText(text, 32, 48 + 24);

	if (keyboard[32]) {
		this.u += 1;
		if (this.u >= 5) {
			activa = this.i;
			this.u = 0;
		}
	}

	var text = "Jugar";
	context.font = "14px mario";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 300 - textSize.width - 16, textSize.width / 2 + 64 + 16 + 140);

	var text = "Instrucciones";
	context.font = "14px mario";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 300 - textSize.width - 16, textSize.width / 2 + 64 + 32 + 140);

	var text = "Creditos";
	context.font = "14px mario";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 300 - textSize.width - 16, textSize.width / 2 + 64 + 32 + 140);
}