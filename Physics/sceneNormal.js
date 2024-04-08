

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

	//-------------- Setas, estrella y bandera

	this.seta = new Seta(13*16 - 7, 19*16 - 16,this.map,true);
	this.seta_cont = 0;

	this.star = new Star(76*16 - 7, 12*16 - 16,this.map,true);
	this.star_cont = 0;
	
	this.bandera = new Bandera(195*16+8, 16*16 ,this.map,true);
	this.bandera_cont = 0;


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
	this.question_box[0] = new Question_Box(13*16, 20*16+4); //seta
	this.question_box[1] = new Question_Box(37*16, 320+4);
	this.question_box[2] = new Question_Box(41*16, 320+4);
	this.question_box[3] = new Question_Box(49*16, 320+4);
	this.question_box[4] = new Question_Box(55*16, 9*16+4);
	this.question_box[5] = new Question_Box(76*16, 13*16+4); //esctrella
	this.question_box[6] = new Question_Box(121*16, 9*16+4);
	this.question_box[7] = new Question_Box(125*16, 9*16+4);
	this.question_box[8] = new Question_Box(125*16, 26*16-4);
	this.question_box[9] = new Question_Box(144*16, 20*16+4);
	this.question_box[10] = new Question_Box(149*16, 9*16+4);
	this.question_box[11] = new Question_Box(155*16, 18*16+4);
	this.question_box[12] = new Question_Box(158*16, 9*16+4);
	this.question_box[13] = new Question_Box(164*16, 20*16+4);
	this.question_box[14] = new Question_Box(169*16, 9*16+4);
	this.question_box[15] = new Question_Box(175*16, 9*16+4);


	this.question_box_active_array = new Array();
	this.question_box_active_array[0] = true;
	this.question_box_active_array[1] = true;
	this.question_box_active_array[2] = true;
	this.question_box_active_array[3] = true;
	this.question_box_active_array[4] = true;
	this.question_box_active_array[5] = true;
	this.question_box_active_array[6] = true;
	this.question_box_active_array[7] = true;
	this.question_box_active_array[8] = true;
	this.question_box_active_array[9] = true;
	this.question_box_active_array[10] = true;
	this.question_box_active_array[11] = true;
	this.question_box_active_array[12] = true;
	this.question_box_active_array[13] = true;
	this.question_box_active_array[14] = true;
	this.question_box_active_array[15] = true;

	//--------------COINS-----------------------

	this.coin = new Coin(165, 24);

	this.coins = new Array();
	this.coins[0] = new SmallCoin(13 * 16, 19 * 16);
	this.coins[1] = new SmallCoin(37 * 16, 19 * 16);
	this.coins[2] = new SmallCoin(41 * 16, 19 * 16);
	this.coins[3] = new SmallCoin(49 * 16, 19 * 16);
	this.coins[4] = new SmallCoin(55 * 16, 8 * 16);
	this.coins[5] = new SmallCoin(76 * 16, 12 * 16);
	this.coins[6] = new SmallCoin(121 * 16, 8 * 16);
	this.coins[7] = new SmallCoin(125 * 16, 8 * 16);
	this.coins[8] = new SmallCoin(125 * 16, 25 * 16);
	this.coins[9] = new SmallCoin(144 * 16, 19 * 16);
	this.coins[10] = new SmallCoin(149 * 16, 8 * 16);
	this.coins[11] = new SmallCoin(155 * 16, 17 * 16);
	this.coins[12] = new SmallCoin(158 * 16, 8 * 16);
	this.coins[13] = new SmallCoin(164 * 16, 19 * 16);
	this.coins[14] = new SmallCoin(169 * 16, 8 * 16);
	this.coins[15] = new SmallCoin(175 * 16, 8 * 16);


	this.coin_active_array = new Array();
	this.coin_active_array[0] = false;
	this.coin_active_array[1] = false;
	this.coin_active_array[2] = false;
	this.coin_active_array[3] = false;
	this.coin_active_array[4] = false;
	this.coin_active_array[5] = false;
	this.coin_active_array[6] = false;
	this.coin_active_array[7] = false;
	this.coin_active_array[8] = false;
	this.coin_active_array[9] = false;
	this.coin_active_array[10] = false;
	this.coin_active_array[11] = false;
	this.coin_active_array[12] = false;
	this.coin_active_array[13] = false;
	this.coin_active_array[14] = false;
	this.coin_active_array[15] = false;

	this.coin_cont_array = new Array();
	this.coin_cont_array[0] = 0;
	this.coin_cont_array[1] = 0;
	this.coin_cont_array[2] = 0;
	this.coin_cont_array[3] = 0;
	this.coin_cont_array[4] = 0;
	this.coin_cont_array[5] = 0;
	this.coin_cont_array[6] = 0;
	this.coin_cont_array[7] = 0;
	this.coin_cont_array[8] = 0;
	this.coin_cont_array[9] = 0;
	this.coin_cont_array[10] = 0;
	this.coin_cont_array[11] = 0;
	this.coin_cont_array[12] = 0;
	this.coin_cont_array[13] = 0;
	this.coin_cont_array[14] = 0;
	this.coin_cont_array[15] = 0;

	this.marioDead = false;
	this.startmarioDead = false;
	this.supermario = false;
	this.cont_cambio = 0;
	this.starmario = false;
	this.invulnerable = false;

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
	this.itemSound = AudioFX('sounds/Item.wav', { volume: 0.5 });
	this.starSound = AudioFX('sounds/star_mario.mp3', { volume: 0.5 });

	// Store current time
	this.currentTime = 0;

	this.points = "000000";

	this.final = false;
	this.time_final = 0;

	this.monedas = "00";
}

SceneNormal.prototype.update = function(deltaTime)
{
	// Keep track of time
	this.currentTime += deltaTime;

	this.bandera.update(deltaTime);

	if (!this.final){
		this.player.moveMario(deltaTime);
			// Update entities
		this.player.update(deltaTime);

		this.seta.update(deltaTime);

		this.star.update(deltaTime);


		if (this.supermario){
			this.seta_cont += 1;
		}

		if (this.star_cont >  1){
			this.star_cont += 1;
		}

	
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

	for (i = 0; i < this.coins.length; i++){
		this.coins[i].update(deltaTime);
	}


	for (i = 0; i < this.goomba_array.length; i++){
		//if( this.goombaActive && this.player.collisionBox().intersect(this.goomba.collisionBox())){
		if(this.cont_cambio==0 && this.goomba_active_array[i] && this.player.collisionBox().intersect(this.goomba_array[i].collisionBox())){
			if (!this.invulnerable){
				if (!this.player.mata){
					var vector = this.player.collisionPosition(this.player.collisionBox(),this.goomba_array[i].collisionBox())
					if(!this.marioDead && vector == "Otra"){	
						if (this.supermario){
							this.invulnerable = true;
							this.supermario = false;
							this.cont_cambio = 1;
						}else{
							this.music.stop();
							this.player.dead();
							this.marioDead = true;
						}
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
			}else{
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

	if (this.question_box_active_array[0] && this.player.collisionBox().intersect(this.question_box[0].collisionBox())){
		this.seta.activa = true;
		this.question_box_active_array[0] = false;
	}

	if (this.question_box_active_array[5] && this.seta.activa && this.player.collisionBox().intersect(this.seta.collisionBox())){
		this.seta.activa = false;
		this.itemSound.play();
		this.supermario = true;
		this.player.romper = true;
		var currentNumber = parseInt(this.points);
		var newNumber = currentNumber + 1000;
		var formattedNumber = ("000000" + newNumber).slice(-6);
		this.points = formattedNumber;
	}

	if (this.player.collisionBox().intersect(this.question_box[5].collisionBox())){
		this.star.activa = true;
		this.star_cont = 1;
		this.question_box_active_array[5] = false;
	}
	

	if (this.star.activa && this.player.collisionBox().intersect(this.star.collisionBox())){
		this.star.activa = false;
		this.starmario = true;
		this.invulnerable = true;
		this.starSound.play();
		this.time_final =  Math.floor(400 - this.currentTime / 1000) - 13;
		var currentNumber = parseInt(this.points);
		var newNumber = currentNumber + 1000;
		var formattedNumber = ("000000" + newNumber).slice(-6);
		this.points = formattedNumber;
	}

	var t = Math.floor(400 - this.currentTime / 1000);
	if (t <= this.time_final){
		this.invulnerable = false;
	}

	for(i = 0; i < this.coins.length; i++){
		if (i != 0 && i != 5){
			if (this.question_box_active_array[i] && this.player.collisionBox().intersect(this.question_box[i].collisionBox())){
				this.coin_active_array[i] = true;
				this.question_box_active_array[i] = false;
			}
		}
	}

	for(i = 0; i < this.coins.length; i++){
		if (i != 0 && i != 5){
			if (this.coin_active_array[i] && this.player.collisionBox().intersect(this.coins[i].collisionBox())){
				this.coin_active_array[i] = false;
				this.coin_cont_array[i] = 1;
				var currentNumber = parseInt(this.points);
				var newNumber = currentNumber + 200;
				var formattedNumber = ("000000" + newNumber).slice(-6);
				this.points = formattedNumber;

				var currentNumber = parseInt(this.monedas);
				var newNumber = currentNumber + 1;
				var formattedNumber = ("0" + newNumber).slice(-6);
				this.monedas = formattedNumber;
			}
		
		}
	}

	for (i = 0; i < this.koopa_array.length; i++){
		if( this.cont_cambio == 0 && this.koopa_active_array[i] && this.player.collisionBox().intersect(this.koopa_array[i].collisionBox())){
			
			if (!this.invulnerable){
				if (!this.player.mata){
					var vector = this.player.collisionPosition(this.player.collisionBox(),this.koopa_array[i].collisionBox())
					if(!this.marioDead && vector == "Otra"){
						if (!this.invulnerable){
							if (this.supermario){
								this.invulnerable = true;
								this.supermario = false;
								this.cont_cambio = 1;
							}else{
								this.music.stop();
								this.player.dead();
								this.marioDead = true;
							}
						}
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
			}else{
				var currentNumber = parseInt(this.points);
				var newNumber = currentNumber + 600;
				var formattedNumber = ("000000" + newNumber).slice(-6);
				this.points = formattedNumber;
				this.koopa_points_array[i] = 100;
				this.koopa_cont_array[i] = 1;
				this.koopa_active_array[i] = false;
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

	if ( this.cont_cambio > 0){
		this.cont_cambio += 1;
	}

	if (this.cont_cambio > 80){
		this.invulnerable = false;
		this.cont_cambio = 0;
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
				// Loading texture to use in a TileMap
			this.pos = 0;
			this.i=0;
			this.sel=0;

			var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
			this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01V4);
			
			this.marioDead = false;
			this.startmarioDead = false;
			interacted = false;
			// restart scene
			// Create entities
			// Loading texture to use in a TileMap
			this.pos = 0;
			this.i=0;
			this.sel=0;
			this.currentTime = 0;

			hurryMusic = false;

			// Create entities
			this.player = new Player(150, 384, this.map,this.pos);

			//-------------- Setas, estrella y bandera

			this.seta = new Seta(13*16 - 7, 19*16 - 16,this.map,true);
			this.seta_cont = 0;

			this.star = new Star(76*16 - 7, 12*16 - 16,this.map,true);
			this.star_cont = 0;
			
			this.bandera = new Bandera(195*16+8, 16*16 ,this.map,true);
			this.bandera_cont = 0;


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
			this.question_box[0] = new Question_Box(13*16, 20*16+4); //seta
			this.question_box[1] = new Question_Box(37*16, 320+4);
			this.question_box[2] = new Question_Box(41*16, 320+4);
			this.question_box[3] = new Question_Box(49*16, 320+4);
			this.question_box[4] = new Question_Box(55*16, 9*16+4);
			this.question_box[5] = new Question_Box(76*16, 13*16+4); //esctrella
			this.question_box[6] = new Question_Box(121*16, 9*16+4);
			this.question_box[7] = new Question_Box(125*16, 9*16+4);
			this.question_box[8] = new Question_Box(125*16, 26*16-4);
			this.question_box[9] = new Question_Box(144*16, 20*16+4);
			this.question_box[10] = new Question_Box(149*16, 9*16+4);
			this.question_box[11] = new Question_Box(155*16, 18*16+4);
			this.question_box[12] = new Question_Box(158*16, 9*16+4);
			this.question_box[13] = new Question_Box(164*16, 20*16+4);
			this.question_box[14] = new Question_Box(169*16, 9*16+4);
			this.question_box[15] = new Question_Box(175*16, 9*16+4);


			this.question_box_active_array = new Array();
			this.question_box_active_array[0] = true;
			this.question_box_active_array[1] = true;
			this.question_box_active_array[2] = true;
			this.question_box_active_array[3] = true;
			this.question_box_active_array[4] = true;
			this.question_box_active_array[5] = true;
			this.question_box_active_array[6] = true;
			this.question_box_active_array[7] = true;
			this.question_box_active_array[8] = true;
			this.question_box_active_array[9] = true;
			this.question_box_active_array[10] = true;
			this.question_box_active_array[11] = true;
			this.question_box_active_array[12] = true;
			this.question_box_active_array[13] = true;
			this.question_box_active_array[14] = true;
			this.question_box_active_array[15] = true;

			//--------------COINS-----------------------

			this.coin = new Coin(165, 24);

			this.coins = new Array();
			this.coins[0] = new SmallCoin(13 * 16, 19 * 16);
			this.coins[1] = new SmallCoin(37 * 16, 19 * 16);
			this.coins[2] = new SmallCoin(41 * 16, 19 * 16);
			this.coins[3] = new SmallCoin(49 * 16, 19 * 16);
			this.coins[4] = new SmallCoin(55 * 16, 8 * 16);
			this.coins[5] = new SmallCoin(76 * 16, 12 * 16);
			this.coins[6] = new SmallCoin(121 * 16, 8 * 16);
			this.coins[7] = new SmallCoin(125 * 16, 8 * 16);
			this.coins[8] = new SmallCoin(125 * 16, 25 * 16);
			this.coins[9] = new SmallCoin(144 * 16, 19 * 16);
			this.coins[10] = new SmallCoin(149 * 16, 8 * 16);
			this.coins[11] = new SmallCoin(155 * 16, 17 * 16);
			this.coins[12] = new SmallCoin(158 * 16, 8 * 16);
			this.coins[13] = new SmallCoin(164 * 16, 19 * 16);
			this.coins[14] = new SmallCoin(169 * 16, 8 * 16);
			this.coins[15] = new SmallCoin(175 * 16, 8 * 16);


			this.coin_active_array = new Array();
			this.coin_active_array[0] = false;
			this.coin_active_array[1] = false;
			this.coin_active_array[2] = false;
			this.coin_active_array[3] = false;
			this.coin_active_array[4] = false;
			this.coin_active_array[5] = false;
			this.coin_active_array[6] = false;
			this.coin_active_array[7] = false;
			this.coin_active_array[8] = false;
			this.coin_active_array[9] = false;
			this.coin_active_array[10] = false;
			this.coin_active_array[11] = false;
			this.coin_active_array[12] = false;
			this.coin_active_array[13] = false;
			this.coin_active_array[14] = false;
			this.coin_active_array[15] = false;

			this.coin_cont_array = new Array();
			this.coin_cont_array[0] = 0;
			this.coin_cont_array[1] = 0;
			this.coin_cont_array[2] = 0;
			this.coin_cont_array[3] = 0;
			this.coin_cont_array[4] = 0;
			this.coin_cont_array[5] = 0;
			this.coin_cont_array[6] = 0;
			this.coin_cont_array[7] = 0;
			this.coin_cont_array[8] = 0;
			this.coin_cont_array[9] = 0;
			this.coin_cont_array[10] = 0;
			this.coin_cont_array[11] = 0;
			this.coin_cont_array[12] = 0;
			this.coin_cont_array[13] = 0;
			this.coin_cont_array[14] = 0;
			this.coin_cont_array[15] = 0;

			this.marioDead = false;
			this.startmarioDead = false;
			this.supermario = false;
			this.cont_cambio = 0;
			this.starmario = false;
			this.invulnerable = false;

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
			this.itemSound = AudioFX('sounds/Item.wav', { volume: 0.5 });
			this.starSound = AudioFX('sounds/star_mario.mp3', { volume: 0.5 });

			// Store current time
			this.currentTime = 0;

			this.points = "000000";

			this.final = false;
			this.time_final = 0;

			this.monedas = "00";
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

	// if time is more than 300 change to hurry music
	if(this.currentTime > 300000 && hurryMusic == false){
		this.music.stop();
		hurryMusic = true;
		this.music = AudioFX('sounds/ThemeHurry.mp3', { loop: true });
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

	if (this.player.sprite.x >= 3108 ){
		this.bandera.bajar=true;
		this.final = true;

	}
	// Draw tilemap
	context.save();
	context.translate(-this.pos,0);
	this.map.draw();

	if (this.seta.activa){
		this.seta.draw();
	}

	if (this.star.activa){
		this.star.draw();
	}

	this.bandera.draw();

	for(var i=0;i<16;i++){
		if (this.question_box_active_array[i] == true)
			this.question_box[i].draw();
	}

	for(var i=0;i<this.coins.length;i++){
		if (this.coin_active_array[i] == true){
			this.coins[i].draw();
		}
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

	if(this.seta_cont > 0 && this.seta_cont <= 80){
		var text = "1000";
		context.font = "12px mario";
		context.fillStyle = "White";
		context.fillText(text, this.seta.sprite.x, this.seta.sprite.y);
	}

	
	if(this.star_cont > 0 && this.star_cont <= 80){
		var text = "1000";
		context.font = "12px mario";
		context.fillStyle = "White";
		context.fillText(text, this.star.sprite.x, this.star.sprite.y);
	}

	for (i = 0; i < this.coins.length; i++){
		if(this.coin_cont_array[i] > 0 && this.coin_cont_array[i] <= 80){
			var text = "200";
			context.font = "12px mario";
			context.fillStyle = "White";
			context.fillText(text, this.coins[i].sprite.x, this.coins[i].sprite.y);
			this.coin_cont_array[i] += 1;
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



	if (Math.floor(400 - this.currentTime / 1000) < 0){
		this.music.stop();
		this.player.dead();
		this.marioDead = true;
	}else{
			
		if (!this.final){
			text = Math.floor(400 - this.currentTime / 1000);
			time = Math.floor(400 - this.currentTime / 1000);
			var textSize = context.measureText(text);
			if(textSize.width < 20)
				context.fillText(text, 454, 48);
			else if(textSize.width < 40)
				context.fillText(text, 436, 48);
			else
				context.fillText(text, 418, 48);
		}else{
			text = time - 1;
			if (time > 1){
				var currentNumber = parseInt(this.points);
				var newNumber = currentNumber + 60;
				var formattedNumber = ("000000" + newNumber).slice(-6);
				this.points = formattedNumber;
				time = time - 1;
			}
			var textSize = context.measureText(text);
			if(textSize.width < 20)
				context.fillText(text, 454, 48);
			else if(textSize.width < 40)
				context.fillText(text, 436, 48);
			else
				context.fillText(text, 418, 48);

			
		}
	}

	// Draw text
	var text = "WORLD";
	var textSize = context.measureText(text);
	context.fillStyle = "White";
	context.fillText(text, 286, 24);

	text = "1-1";
	var textSize = context.measureText(text);
	context.fillText(text, 286, 48);

	// Draw text
	var text = "x"+this.monedas;
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



