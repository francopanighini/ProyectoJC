

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TexturedQuad
	var img = new Texture("imgs/varied.png");
	var brick_img = new Texture("imgs/brick.png");

	// Prepare all quads
	this.quads = new Array();
	//x, y, width, height, color = "white"
	this.quads.push(new Quad(0, 0, 512, 448-64, "blue"));
	this.quads.push(new Quad(0, 448-64, 512, 16, "green"));
	
	//this.texQuad = new Array();
	//this.texQuad.push(new TexturedQuad(0, 0, 32, 32, 320, 288, 128, 128, img));
	//(sx, sy, sWidth, sHeight, x, y, width, height, texture, smoothing = false
	this.personajeQuad = new TexturedQuad(0, 0, 32, 32, 320, 274+65, 65, 65, img);
	this.estrellaQuad = new TexturedQuad(32, 32, 32, 32, 512/2-16,448-(16*3)-65-65, 65, 65, img);


	this.texQuad = new Array();
	for(var y = 448-64+16; y <= 448-64+48; y+=16)
	{
		for(var x = 0; x < 512; x+=16)
		{
			this.texQuad.push(new TexturedQuad(0, 0, 64, 64, x, y, 16, 16, brick_img));
		}
	}

	this.plataforma = new Array();
	//for(var y = 448-64+16-64; y <= 448-64+48; y+=16)
	//{
	//	for(var x = 0; x < 512; x+=16)
	//	{
			this.plataforma.push(new TexturedQuad(0, 0, 64, 64, 512/2,  448-64+16-64-16, 16, 16, brick_img));
			this.plataforma.push(new TexturedQuad(0, 0, 64, 64, 512/2+16,  448-64+16-64-16, 16, 16, brick_img));
			this.plataforma.push(new TexturedQuad(0, 0, 64, 64, 512/2-16,  448-64+16-64-16, 16, 16, brick_img));

	//	}
	//}
	// this.texQuad.push(new TexturedQuad(0, 0, 64, 64, 0, 448-64+16, 16, 16, brick_img));
	// this.texQuad.push(new TexturedQuad(0, 0, 64, 64, 0, 448-64+32, 16, 16, brick_img));
	// this.texQuad.push(new TexturedQuad(0, 0, 64, 64, 0, 448-64+48, 16, 16, brick_img));


	
	// Store current time
	this.currentTime = 0
}


Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(199, 253, 255)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw color quads
	// context.save();
	// context.translate(32 * Math.sin(this.currentTime / 1000), 0);
	// this.quads[0].draw();
	// context.restore();
	
	/*context.save();
	this.quads[0].draw();
	context.restore();*/

	// context.save();
	// context.translate(-32 * Math.sin(this.currentTime / 1000), 0);
	// this.quads[1].draw();
	// context.restore();
	
	context.save();
	this.quads[1].draw();
	context.restore();

	context.save();
	this.estrellaQuad.draw();
	context.restore();

	// context.save();
	// context.translate(32 * Math.sin(this.currentTime / 1000), 0);
	// this.quads[2].draw();
	// context.restore();
		
	// // Draw textured quad
	// context.save();
	// context.translate(-32 * Math.sin(this.currentTime / 1000), 0);
	// this.texQuad.draw();
	// context.restore();

	for(var i = 0; i < this.texQuad.length; i++)
	{
		context.save();
		this.texQuad[i].draw();
		context.restore();
	}


	for(var i = 0; i < this.plataforma.length; i++)
	{
		context.save();
		this.plataforma[i].draw();
		context.restore();
	}

	context.save();
	if (keyboard[65]) {
		this.personajeQuad.x = this.personajeQuad.x - 5;
	}
	if (keyboard[68]) {
		this.personajeQuad.x = this.personajeQuad.x + 5;
	}
	this.personajeQuad.draw();
	context.restore();


	context.save();
	if (keyboard[87]) {
		var posAnterior = this.personajeQuad.y;
		this.personajeQuad.y = this.personajeQuad.y - 32;
		this.personajeQuad.draw();
		/*while (this.personajeQuad.y != posAnterior){
			console.log("entra");
			this.personajeQuad.y = this.personajeQuad.y + 1;
			posAnterior = posAnterior -1;
			this.personajeQuad.draw();
		}*/
	}
	this.personajeQuad.draw();
	context.restore();


	context.save();
	if (keyboard[83]) {
		var posAnterior = this.personajeQuad.y;
		this.personajeQuad.y = this.personajeQuad.y + 5;
	}
	this.personajeQuad.draw();
	context.restore();

	
	

	// Draw text
	var text = "TIME";
	context.font = "24px Verdana";
	var textSize = context.measureText(text);
	context.fillStyle = "SlateGrey";
	context.fillText(text, 512 - textSize.width - 16, textSize.width/2);
	
	text = Math.floor(this.currentTime / 1000);
	var textSize = context.measureText(text);
	context.fillText(text, 512 - textSize.width - 16, textSize.width/2 + 50);

	if(keyboard[32])
	{
		text = "Spacebar pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}
}



