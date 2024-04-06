

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

	//--------------Goomba-----------------------
	//this.goomba = new Goomba(512, 200, this.map,false);
	//this.goombaActive = true;
	//this.contBoomba = 0;

	this.goomba_array = new Array();
	this.goomba_array[0] = new Goomba(512, 200, this.map,false);
	this.goomba_array[1] = new Goomba(52*16, 25*16 - 16, this.map,true);
	this.goomba_array[2] = new Goomba(53*16, 25*16 - 16, this.map,false);
	this.goomba_array[3] = new Goomba(105*16, 25*16 - 16, this.map,false);
	this.goomba_array[4] = new Goomba(108*16, 25*16 - 16, this.map,false);
	this.goomba_array[5] = new Goomba(115*16, 25*16 - 16, this.map,false);
	this.goomba_array[6] = new Goomba(161*16, 25*16 - 16, this.map,false);
	this.goomba_array[7] = new Goomba(192*16, 25*16 - 16, this.map,false);


	this.goomba_active_array = new Array();
	this.goomba_active_array[0] = true;
	this.goomba_active_array[1] = true;
	this.goomba_active_array[2] = true;
	this.goomba_active_array[3] = true;
	this.goomba_active_array[4] = true;
	this.goomba_active_array[5] = true;
	this.goomba_active_array[6] = true;
	this.goomba_active_array[7] = true;

	this.goomba_cont_array = new Array();
	this.goomba_cont_array[0] = 0;
	this.goomba_cont_array[1] = 0;
	this.goomba_cont_array[2] = 0;
	this.goomba_cont_array[3] = 0;
	this.goomba_cont_array[4] = 0;
	this.goomba_cont_array[5] = 0;
	this.goomba_cont_array[6] = 0;
	this.goomba_cont_array[7] = 0;



	//--------------KOOPA-----------------------
	//this.koopaActive = true;
	//this.koopa = new Koopa(360, 384, this.map,true);
	//this.pointskoopa = 100;
	//this.contkoopa = 0;

	this.koopa_array = new Array();
	this.koopa_array[0] = new Koopa(360, 384, this.map,true);
	this.koopa_array[1] = new Koopa(126*16, 13*16 - 16, this.map,false);
	this.koopa_array[2] = new Koopa(140*16, 25*16 - 16, this.map,false);
	this.koopa_array[3] = new Koopa(152*16, 25*16 - 16, this.map,false);

	this.koopa_active_array = new Array();
	this.koopa_active_array[0] = true;
	this.koopa_active_array[1] = true;
	this.koopa_active_array[2] = true;
	this.koopa_active_array[3] = true;

	this.koopa_cont_array = new Array();
	this.koopa_cont_array[0] = 0;
	this.koopa_cont_array[1] = 0;
	this.koopa_cont_array[2] = 0;
	this.koopa_cont_array[3] = 0;

	this.koopa_points_array = new Array();
	this.koopa_points_array[0] = 100;
	this.koopa_points_array[1] = 100;
	this.koopa_points_array[2] = 100;
	this.koopa_points_array[3] = 100;


	//--------------Question_box-----------------------
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

	this.points = "000000";
}

SceneNormal.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;

	this.player.moveMario(deltaTime);

	// Update entities
	this.player.update(deltaTime);

	
	//this.goomba.update(deltaTime);
	for (i = 0; i < this.goomba_array.length; i++){
		this.goomba_array[i].update(deltaTime);
	}

	//this.koopa.update(deltaTime);
	for (i = 0; i < this.koopa_array.length; i++){
		this.koopa_array[i].update(deltaTime);
	}

	for(var i=0;i<16;i++){
		this.question_box[i].update(deltaTime);
	}
	
	this.coin.update(deltaTime);


	for (i = 0; i < this.goomba_array.length; i++){
		//if( this.goombaActive && this.player.collisionBox().intersect(this.goomba.collisionBox())){
		if( this.goomba_active_array[i] && this.player.collisionBox().intersect(this.goomba_array[i].collisionBox())){
			if (!this.player.mata){
				var vector = this.player.collisionPosition(this.player.collisionBox(),this.goomba_array[i].collisionBox())
				if(!this.marioDead && vector == "Otra"){
					this.music.stop();
					this.player.dead();
					this.marioDead = true;
				}else if(!this.marioDead) {
					this.player.mata = true;
					this.player.bJumping = true;
					this.player.jumpAngle = 0;
					this.player.startY = this.player.sprite.y;
					this.goomba_array[i].muerto = true;
					this.squishSound.play();
					var currentNumber = parseInt(this.points);
					var newNumber = currentNumber + 100;
					var formattedNumber = ("000000" + newNumber).slice(-6);
					this.points = formattedNumber;
				}
			}
		}
	}
	
	for (i = 0; i < this.koopa_array.length; i++){
		if( this.koopa_active_array[i] && this.player.collisionBox().intersect(this.koopa_array[i].collisionBox())){
			if (!this.player.mata){
				var vector = this.player.collisionPosition(this.player.collisionBox(),this.koopa_array[i].collisionBox())
				if(!this.marioDead && vector == "Otra"){
					this.music.stop();
					this.player.dead();
					this.marioDead = true;
				}else if (this.koopa_array[i].caparazon){
					this.player.bJumping = true;
					this.player.jumpAngle = 0;
					this.player.startY = this.player.sprite.y;
					this.koopa_array[i].dirCap = vector;
					if(vector == "AbajoD"){
						this.koopa_array[i].direccion = true;
					}else if(vector == "AbajoI"){
						this.koopa_array[i].direccion = false;
					}
					this.koopa_points_array[i] = 500;
					var currentNumber = parseInt(this.points);
					var newNumber = currentNumber + 500;
					var formattedNumber = ("000000" + newNumber).slice(-6);
					this.points = formattedNumber;
					this.koopa_cont_array[i] = 100;
				}else if(!this.marioDead) {
					this.player.bJumping = true;
					this.player.jumpAngle = 0;
					this.player.startY = this.player.sprite.y;
					this.koopa_array[i].caparazon = true;
					var currentNumber = parseInt(this.points);
					var newNumber = currentNumber + 100;
					var formattedNumber = ("000000" + newNumber).slice(-6);
					this.points = formattedNumber;
					this.koopa_points_array[i] = 100;
					this.koopa_cont_array[i] = 1;
				}
			}
		}
	}
		


	for (i = 0; i < this.goomba_array.length; i++){	
		for(j = 0; j < this.koopa_array.length; j++){
			if( this.koopa_array[j].caparazon && this.goomba_active_array[i] && this.koopa_active_array[j] && this.koopa_array[j].collisionBox().intersect(this.goomba_array[i].collisionBox())){
				this.goomba_array[i].muerto = true;
				this.squishSound.play();
				break;
			}
		}
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

	for (i = 0; i < this.goomba_array.length; i++){
		if (this.goomba_array[i].muerto){
			this.goomba_cont_array[i] += 1;
			if(this.goomba_cont_array[i] >= 20){
				this.goomba_active_array[i] = false;
			}
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
		// Loading texture to use in a TileMap
		this.pos = 0;
		this.i=0;
		this.sel=0;

		var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
		this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01V4);

		// Create entities
		this.player = new Player(150, 384, this.map,this.pos);

		//--------------Goomba-----------------------
		//this.goomba = new Goomba(512, 200, this.map,false);
		//this.goombaActive = true;
		//this.contBoomba = 0;

		this.goomba_array = new Array();
		this.goomba_array[0] = new Goomba(512, 200, this.map,false);
		this.goomba_array[1] = new Goomba(52*16, 25*16 - 16, this.map,true);
		this.goomba_array[2] = new Goomba(53*16, 25*16 - 16, this.map,false);
		this.goomba_array[3] = new Goomba(105*16, 25*16 - 16, this.map,false);
		this.goomba_array[4] = new Goomba(108*16, 25*16 - 16, this.map,false);
		this.goomba_array[5] = new Goomba(115*16, 25*16 - 16, this.map,false);
		this.goomba_array[6] = new Goomba(161*16, 25*16 - 16, this.map,false);
		this.goomba_array[7] = new Goomba(192*16, 25*16 - 16, this.map,false);


		this.goomba_active_array = new Array();
		this.goomba_active_array[0] = true;
		this.goomba_active_array[1] = true;
		this.goomba_active_array[2] = true;
		this.goomba_active_array[3] = true;
		this.goomba_active_array[4] = true;
		this.goomba_active_array[5] = true;
		this.goomba_active_array[6] = true;
		this.goomba_active_array[7] = true;

		this.goomba_cont_array = new Array();
		this.goomba_cont_array[0] = 0;
		this.goomba_cont_array[1] = 0;
		this.goomba_cont_array[2] = 0;
		this.goomba_cont_array[3] = 0;
		this.goomba_cont_array[4] = 0;
		this.goomba_cont_array[5] = 0;
		this.goomba_cont_array[6] = 0;
		this.goomba_cont_array[7] = 0;



		//--------------KOOPA-----------------------
		//this.koopaActive = true;
		//this.koopa = new Koopa(360, 384, this.map,true);
		//this.pointskoopa = 100;
		//this.contkoopa = 0;

		this.koopa_array = new Array();
		this.koopa_array[0] = new Koopa(360, 384, this.map,true);
		this.koopa_array[1] = new Koopa(126*16, 13*16 - 16, this.map,false);
		this.koopa_array[2] = new Koopa(140*16, 25*16 - 16, this.map,false);
		this.koopa_array[3] = new Koopa(152*16, 25*16 - 16, this.map,false);

		this.koopa_active_array = new Array();
		this.koopa_active_array[0] = true;
		this.koopa_active_array[1] = true;
		this.koopa_active_array[2] = true;
		this.koopa_active_array[3] = true;

		this.koopa_cont_array = new Array();
		this.koopa_cont_array[0] = 0;
		this.koopa_cont_array[1] = 0;
		this.koopa_cont_array[2] = 0;
		this.koopa_cont_array[3] = 0;

		this.koopa_points_array = new Array();
		this.koopa_points_array[0] = 100;
		this.koopa_points_array[1] = 100;
		this.koopa_points_array[2] = 100;
		this.koopa_points_array[3] = 100;


		//--------------Question_box-----------------------
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

		this.points = "000000";
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
	}
	if (keyboard[68]) {
		this.pos = this.pos + 5;
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
	
	for (i = 0; i < this.goomba_array.length; i++){
		if(this.goomba_active_array[i])
			this.goomba_array[i].draw();
		else if(this.goomba_cont_array[i] <= 80){
			var text = "100";
			context.font = "12px mario";
			context.fillStyle = "White";
			context.fillText(text, this.goomba_array[i].sprite.x, this.goomba_array[i].sprite.y);
		}
	}
	
	


	this.player.draw();

	for (i = 0; i < this.koopa_array.length; i++){
		if(this.koopa_active_array[i])
			this.koopa_array[i].draw();
	}


	for (i = 0; i < this.koopa_array.length; i++){
		if(this.koopa_cont_array[i] < 50 && this.koopa_cont_array[i] > 0){
			var text = this.koopa_points_array[i];
			context.font = "12px mario";
			context.fillStyle = "White";
			context.fillText(text, this.koopa_array[i].sprite.x, this.koopa_array[i].sprite.y);
			this.koopa_cont_array[i] += 1;
		}
	}

	for (i = 0; i < this.koopa_array.length; i++){
		if(this.koopa_cont_array[i] < 200 && this.koopa_cont_array[i] >= 100){
			var text = this.koopa_points_array[i];
			context.font = "12px mario";
			context.fillStyle = "White";
			context.fillText(text, this.koopa_array[i].sprite.x, this.koopa_array[i].sprite.y);
			this.koopa_cont_array[i] += 1;
		}
	}



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

	var textSize = context.measureText(this.points);
	context.fillText(this.points, 32, 48);

	this.coin.draw();
}



