// Scene. Updates and draws a single scene of the game.
function Scene() {
	// Loading texture to use in a TileMap
	this.pos = 0;
	this.i = 0;
	this.sel = 0;

	var tilesheet = new Texture("imgs/CompleteTilesheetLvl1.png");
	this.map = new Tilemap(tilesheet, [16, 16], [4, 8], [0, 0], level01V4);

	//var tilesheet = new Texture("imgs/lava.png");
	//this.map = new Tilemap(tilesheet, [16, 16], [6, 4], [0, 0], lava);

	// Create entities
	this.player = new Player(150, 384, this.map, this.pos);
	//this.bubble = new Bubble(360, 112);
	this.goomba = new Goomba(512, 200, this.map);
	//this.goomba = new Goomba(100, 200, this.map,true);

	//this.bubbleActive = true;
	this.goombaActive = true;

	this.question_box = new Question_Box(208, 320);

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

	this.contBoomba = 0;
	// Store current time
	this.currentTime = 0
}

Scene.prototype.update = function (deltaTime) {
	// Keep track of time
	this.currentTime += deltaTime;

	this.player.moveMario(deltaTime);

	// Update entities
	this.player.update(deltaTime);
	//this.bubble.update(deltaTime);
	this.goomba.update(deltaTime);

	this.question_box.update(deltaTime);

	// Check for collision between entities
	/*if(this.player.collisionBox().intersect(this.bubble.collisionBox()))
		this.bubbleActive = false;*/

	if (this.goombaActive && this.player.collisionBox().intersect(this.goomba.collisionBox())) {
		//this.goombaActive = false;

		/*console.log(this.player.collisionBox().intersect(this.goomba.collisionBox()));
		console.log(this.player.collisionBox())
		console.log(this.goomba.collisionBox())
		var col = this.player.collisionBox();
		var col2 = this.goomba.collisionBox();
		console.log(col.min_x);
		console.log(col2.min_x);*/
		if (!this.player.mata) {
			//console.log("hola");
			var vector = this.player.collisionPosition(this.player.collisionBox(), this.goomba.collisionBox())
			//console.log(vector);

			if (!this.marioDead && vector == "Otra") {
				this.music.stop();
				this.player.dead();
				this.marioDead = true;
			} else {
				this.player.mata = true;
				this.player.bJumping = true;
				this.player.jumpAngle = 0;
				this.player.startY = this.player.sprite.y;
				this.goomba.muerto = true;
				this.squishSound.play();
			}
		}
	}

	// Init music once user has interacted
	if (interacted)
		this.music.play();

	// Play jump sound when up key is pressed
	if (keyboard[38])
		this.jumpSound.play();

	// Play die sound when Mario dies
	if (this.marioDead && !this.startmarioDead) {
		this.dieSound.play();
		this.startmarioDead = true;
	}

	if (this.goomba.muerto) {
		this.contBoomba += 1;
		if (this.contBoomba >= 20)
			this.goombaActive = false;
	}
}

Scene.prototype.draw = function () {
	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Clear background
	context.fillStyle = "rgb(160, 172, 254)";
	context.fillRect(0, 0, canvas.width, canvas.height);

	if (keyboard[65])
		this.pos = this.pos - 5;
		//this.map.basePos = [this.pos,0]
	if (keyboard[68])
		this.pos = this.pos + 5;
		//this.map.basePos = [this.pos,0]

	if (this.player.sprite.x >= (200 + this.pos) && this.player.sprite.x < 3000) {
		this.pos += 2;
		this.player.posMap = this.pos;
	}

	// Draw tilemap
	context.save();
	context.translate(-this.pos, 0);
	this.map.draw();

	this.question_box.draw();
	// Draw entities
	/*if(this.bubbleActive)
		this.bubble.draw();*/
	if (this.goombaActive)
		this.goomba.draw();
	this.player.draw();
	context.restore();
}