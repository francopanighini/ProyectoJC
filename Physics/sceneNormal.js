

// Scene. Updates and draws a single scene of the game.

function SceneNormal()
{
	// Loading texture to use in a TileMap
	this.pos = 0;
	this.i=0;
	this.sel=0;

	var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
	this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01V4);

	// Create entities
	this.player = new Player(150, 384, this.map,this.pos);
	//this.bubble = new Bubble(360, 112);
	this.goomba = new Goomba(512, 200, this.map,false);
	//this.bubbleActive = true;
	this.goombaActive = true;

	this.koopaActive = true;

	this.koopa = new Koopa(360, 384, this.map,true);

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
	this.currentTime = 0;

	this.contBoomba = 0;
}

SceneNormal.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;
	
	this.player.moveMario(deltaTime);

	// Update entities
	this.player.update(deltaTime);
	//this.bubble.update(deltaTime);
	this.goomba.update(deltaTime);

	this.koopa.update(deltaTime);

	for(var i=0;i<16;i++){
		this.question_box[i].update(deltaTime);
	}
	this.coin.update(deltaTime);
	
	// Check for collision between entities
	/*if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;*/
	
		if( this.goombaActive && this.player.collisionBox().intersect(this.goomba.collisionBox())){ 
			//this.goombaActive = false;
	
			/*console.log(this.player.collisionBox().intersect(this.goomba.collisionBox()));
			console.log(this.player.collisionBox())
			console.log(this.goomba.collisionBox())
			var col = this.player.collisionBox();
			var col2 = this.goomba.collisionBox();
			console.log(col.min_x);
			console.log(col2.min_x);*/
			if (!this.player.mata){
				
				var vector = this.player.collisionPosition(this.player.collisionBox(),this.goomba.collisionBox())
				//console.log(vector);
				
				if(!this.marioDead && vector == "Otra"){
					this.music.stop();
					this.player.dead();
					this.marioDead = true;
				}else if(!this.marioDead) {
					this.player.mata = true;
					this.player.bJumping = true;
					this.player.jumpAngle = 0;
					this.player.startY = this.player.sprite.y;
					this.goomba.muerto = true;
					this.squishSound.play();
				}	
			}
				
			
			
		}

		if( this.koopaActive && this.player.collisionBox().intersect(this.koopa.collisionBox())){ 

			if (!this.player.mata){
				
				var vector = this.player.collisionPosition(this.player.collisionBox(),this.koopa.collisionBox())
				//console.log(vector);
				
				if(!this.marioDead && vector == "Otra"){
					this.music.stop();
					this.player.dead();
					this.marioDead = true;
				}else if (this.koopa.caparazon){
					//console.log("hola");
					this.player.bJumping = true;
					this.player.jumpAngle = 0;
					this.player.startY = this.player.sprite.y;
					this.koopa.dirCap = vector;
					if(vector == "AbajoD"){
						this.koopa.direccion = true;
					}else if(vector == "AbajoI"){
						this.koopa.direccion = false;
					}
				}else if(!this.marioDead) {
					this.player.bJumping = true;
					this.player.jumpAngle = 0;
					this.player.startY = this.player.sprite.y;
					this.koopa.caparazon = true;
				}

				
			}
				
			
			
		}


		if( this.goombaActive && this.koopaActive &&this.koopa.collisionBox().intersect(this.goomba.collisionBox())){ 
			this.goomba.muerto = true;
			this.squishSound.play();
		}
		

	// Init music once user has interacted
	if(interacted && !this.marioDead)
		this.music.play();
	
	// Play jump sound when up key is pressed
	if(keyboard[38])
		this.jumpSound.play();

	// Play die sound when Mario dies
	if(this.marioDead && !this.startmarioDead){
		this.dieSound.play();
		this.startmarioDead = true;
	}

	if (this.goomba.muerto){
		this.contBoomba += 1;
		if(this.contBoomba >= 20){
			this.goombaActive = false;
		}
	}

	// if key 2 is pressed, change scene to lava map (sceneLava.js)
	if(keyboard[50] && !keyboard[49]){
		this.music.stop();

		this.marioDead = false;
		this.startmarioDead = false;
		interacted = false;
		activa = 4;
	}

	// if key 1 is pressed reset the scene
	if(keyboard[49] && !keyboard[50]){
		this.music.stop();

		this.marioDead = false;
		this.startmarioDead = false;
		interacted = false;
		// restart scene
		// Create entities
		this.player = new Player(150, 384, this.map,this.pos);
		//this.bubble = new Bubble(360, 112);
		this.goomba = new Goomba(512, 200, this.map,false);
		//this.bubbleActive = true;
		this.goombaActive = true;
		this.currentTime = 0;
		this.music.play()
		this.pos = 0;
		this.player.posMap = this.pos;
		this.map.basePos = [this.pos,0]
		this.coin = new Coin(165, 24)
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
	}

}

SceneNormal.prototype.draw = function ()
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

	// Transform to super mario if M key is pressed
	// if(keyboard[77])
	// 	this.player.superMario();

	// // Transform to star mario if G key is pressed
	// if(keyboard[71])
	// 	this.player.starMario();

	
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

	if(this.koopaActive)
		this.koopa.draw();
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

	this.coin.draw();
}



