

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TexturedQuad
	var img = new Texture("imgs/varied.png");
	var brick_img = new Texture("imgs/brick.png");

	// Prepare all quads
	this.quads = new Array();
	this.quads.push(new Quad(0, 0, 512, 448-64, "blue"));
	this.quads.push(new Quad(0, 448-64, 512, 16, "green"));
	
	this.texQuad = new Array();
	this.texQuad.push(new TexturedQuad(0, 0, 32, 32, 320, 288, 128, 128, img));

	for(var y = 448-64+16; y <= 448-64+48; y+=16)
	{
		for(var x = 0; x < 512; x+=16)
		{
			this.texQuad.push(new TexturedQuad(0, 0, 64, 64, x, y, 16, 16, brick_img));
		}
	}
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
	context.fillStyle = "rgb(224, 224, 240)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	// Draw color quads
	// context.save();
	// context.translate(32 * Math.sin(this.currentTime / 1000), 0);
	// this.quads[0].draw();
	// context.restore();
	
	context.save();
	this.quads[0].draw();
	context.restore();

	// context.save();
	// context.translate(-32 * Math.sin(this.currentTime / 1000), 0);
	// this.quads[1].draw();
	// context.restore();
	
	context.save();
	this.quads[1].draw();
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

	// Draw text
	var text = "Videogames!!!";
	context.font = "24px Verdana";
	var textSize = context.measureText(text);
	context.fillStyle = "SlateGrey";
	context.fillText(text, 256 - textSize.width/2, 224 - 12);
	
	text = "Active for " + Math.floor(this.currentTime / 1000) + " seconds";
	var textSize = context.measureText(text);
	context.fillText(text, 256 - textSize.width/2, 224 + 12);

	if(keyboard[32])
	{
		text = "Spacebar pressed";
		var textSize = context.measureText(text);
		context.fillText(text, 256 - textSize.width/2, 224 + 36);
	}
}



