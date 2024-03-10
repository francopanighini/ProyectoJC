

// Scene. Updates and draws a single scene of the game.

function SceneCreditos()
{
	this.u = 0;
	// Store current time
	this.currentTime = 0
}


SceneCreditos.prototype.update = function(deltaTime)
{

	// Keep track of time
	this.currentTime += deltaTime;
}

SceneCreditos.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(0, 0, 0)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	var text = "CREDITOS";	
	context.font = "24px mario";
	context.fillStyle = "White";
	context.fillText(text, 140, 64);

	var maxWidth = 512; // Ancho máximo permitido
	var lineHeight = 14; // Altura de línea
	var text = "Juego creado para la asignatura de \"Jocs per computadors\" en el máster de ingeniería informática de la Universidad Politécnica de Catalunya (UPC) en la Facultad de ingeniería informática de Barcelona (FIB).";	
	context.font = "10px mario";
	context.fillStyle = "White";
	
	var words = text.split(' ');
	var line = '';
	var y = 128; // Posición vertical inicial
	
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
	

	var text = "Creadores: Judit Cerdà y Franco Panighini";	
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 16, 214);

	text = "Pulsa espacio para volver";
	context.font = "10px mario";
	context.fillStyle = "White";
	context.fillText(text, 100, 400);


	if(keyboard[32])
	{
		this.u += 1;
		if(this.u >= 5){
			activa = 3;
			this.u = 0;
		}

	}

}



