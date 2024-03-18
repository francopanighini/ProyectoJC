

// Scene. Updates and draws a single scene of the game.

function Scene()
{
	// Loading texture to use in a TileMap
	this.pos = 0;
	this.i=0;
	this.sel=0;

	var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
	this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01V4);

	//var tilesheet = new Texture("imgs/lava.png");
	//this.map = new Tilemap(tilesheet, [16, 16], [6, 4], [0, 0], lava);
	
	// Create entities
	this.player = new Player(150, 384, this.map,this.pos);
	//this.bubble = new Bubble(360, 112);
	this.goomba = new Goomba(512, 384);
	//this.bubbleActive = true;
	this.goombaActive = true;

	this.question_box = new Array();
	this.question_box[0] = new Question_Box(208, 320);
	this.question_box[1] = new Question_Box(37*16, 320);
	this.question_box[2] = new Question_Box(41*16, 320);
	this.question_box[3] = new Question_Box(49*16, 320);
	this.question_box[4] = new Question_Box(55*16, 9*16);
	this.question_box[5] = new Question_Box(76*16, 13*16);
	this.question_box[6] = new Question_Box(121*16, 9*16);
	this.question_box[7] = new Question_Box(125*16, 9*16);
	this.question_box[8] = new Question_Box(125*16, 26*16);
	this.question_box[9] = new Question_Box(144*16, 20*16);
	this.question_box[10] = new Question_Box(149*16, 9*16);
	this.question_box[11] = new Question_Box(155*16, 18*16);
	this.question_box[12] = new Question_Box(158*16, 9*16);
	this.question_box[13] = new Question_Box(164*16, 20*16);
	this.question_box[14] = new Question_Box(169*16, 9*16);
	this.question_box[15] = new Question_Box(175*16, 9*16);

	this.coin = new Coin(165, 24);


	this.marioDead = false;
	this.startmarioDead = false;

	// Prepare sounds
	this.music = AudioFX('sounds/1 - Running About.mp3', { loop: true });
	this.oneUpSound = AudioFX('sounds/1up.wav', { volume: 0.5 });
	this.jumpSound = AudioFX('sounds/Jump.wav');
	this.coinSound = AudioFX('sounds/Coin.wav', { volume: 0.5 });
	this.dieSound = AudioFX('sounds/Die.wav', { volume: 0.5 });
	this.flagpoleSound = AudioFX('sounds/Flagpole.wav', { volume: 0.5 });
	this.gameOverSound = AudioFX('sounds/GameOver.wav', { volume: 0.5 });
	this.kickSound = AudioFX('sounds/Kick.wav', { volume: 0.5 });
	this.pauseSound = AudioFX('sounds/Pause.wav', { volume: 0.5 });
	this.powerUpSound = AudioFX('sounds/PowerUp.wav', { volume: 0.5 });
	this.squishSound = AudioFX('sounds/Squish.wav', { volume: 0.5 });
	this.vineSound = AudioFX('sounds/Vine.wav', { volume: 0.5 });
	this.warpSound = AudioFX('sounds/Warp.wav', { volume: 0.5 });
	this.bumpSound = AudioFX('sounds/Bump.wav', { volume: 0.5 });

	// Store current time
	this.currentTime = 0
}

Scene.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	this.player.moveMario(deltaTime);

	// Update entities
	this.player.update(deltaTime);
	//this.bubble.update(deltaTime);
	this.goomba.update(deltaTime);

	for(var i=0;i<16;i++){
		this.question_box[i].update(deltaTime);
	}
	this.coin.update(deltaTime);
	
	// Check for collision between entities
	/*if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;*/
	
	if(this.player.collisionBox().intersect(this.goomba.collisionBox())){
		//this.goombaActive = false;
		if(!this.marioDead){
			this.player.dead();
		}
		
		this.marioDead = true;
	}

	// Init music once user has interacted
	if(interacted)
		this.music.play();
	
	// Play jump sound when up key is pressed
	if(keyboard[38])
		this.jumpSound.play();

	// Play die sound when Mario dies
	if(this.marioDead && !this.startmarioDead){
		this.dieSound.play();
		this.startmarioDead = true;
	}

}

Scene.prototype.draw = function ()
{
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(160, 172, 254)";
	context.fillRect(0, 0, canvas.width, canvas.height);



	
	if (keyboard[65]) {
		this.pos = this.pos - 5;
		//this.map.basePos = [this.pos,0]
	}
	if (keyboard[68]) {
		this.pos = this.pos + 5;
		//this.map.basePos = [this.pos,0]

	}	

	
	if(this.player.sprite.x >= (200+this.pos) && this.player.sprite.x < 3000){
		this.pos +=2;
		this.player.posMap = this.pos;
	}
	// Draw tilemap
	context.save();
	context.translate(-this.pos,0);
	this.map.draw();
	

	for(var i=0;i<16;i++){
		this.question_box[i].draw();
	}
	// Draw entities
	/*if(this.bubbleActive)
		this.bubble.draw();*/
	if(this.goombaActive)
		this.goomba.draw();
	this.player.draw();
	this.coin.draw();
	context.restore();

	// Draw UI

		// Draw text
	var text = "TIME";
	context.font = "18px mario";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	// right side of the screen
	context.fillText(text, 400, 24);
	
	text = Math.floor(400 - this.currentTime / 1000);
	var textSize = context.measureText(text);
	if(textSize.width < 20)
		context.fillText(text, 454, 48);
	else if(textSize.width < 40)
		context.fillText(text, 436, 48);
	else
		context.fillText(text, 418, 48);

	// Draw text
	var text = "WORLD";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 286, 24);

	text = "1-1";
	var textSize = context.measureText(text);
	context.fillText(text, 286, 48);

	// Draw text
	var text = "x00";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 190, 48);

	// Draw text
	var text = "MARIO";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 32, 24);

	text = "000000";
	var textSize = context.measureText(text);
	context.fillText(text, 32, 48);
}



