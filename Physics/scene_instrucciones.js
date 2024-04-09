// Scene. Updates and draws a single scene of the game.
function SceneInstrucciones() {
	var img = new Texture("imgs/teclas.png");
	// Store current 

	this.instruc = new TexturedQuad(0, 0, 512, 448, 0, 0, 512, 448, img);
	this.u = 0;
	this.currentTime = 0
}

SceneInstrucciones.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;
}

SceneInstrucciones.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.save();
	this.instruc.draw();
	context.restore();

	var text = "INSTRUCCIONES";
	context.font = "24px mario";
	context.fillStyle = "White";
	context.fillText(text, 100, 64);

	var maxWidth = 512; // Ancho máximo permitido
	var lineHeight = 14; // Altura de línea
	var text = "";
	context.font = "10px mario";
	context.fillStyle = "White";

	var words = text.split(' ');
	var line = '';
	var y = 64; // Posición vertical inicial

	for (var i = 0; i < words.length; i++) {
		var testLine = line + words[i] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;

		if (testWidth > maxWidth && i > 0) {
			context.fillText(line, 16, y);
			line = words[i] + ' ';
			y += lineHeight;
		} else {
			line = testLine;
		}
	}

	var text = "< moverse izquierda";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 200, 150);

	var text = " ^ saltar ";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 200, 174);

	var text = " moverse derecha >";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 200, 200);

	var text = " correr";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 200, 246);

	var text = " saltar";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 340, 300);

	text = "Pulsa espacio para volver";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 100, 400);

	if (keyboard[32]) {
		this.u += 1;
		if (this.u >= 5) {
			activa = 3;
			this.u = 0;
		}
	}
}