
const MARIO_STAND_LEFT = 0;
const MARIO_STAND_RIGHT = 1;
const MARIO_WALK_LEFT = 2;
const MARIO_WALK_RIGHT = 3;
const MARIO_JUMP_R = 4;
const MARIO_STOP_JUMP_R = 5;
const MARIO_JUMP_L = 6;
const MARIO_STOP_JUMP_L = 7;
const MARIO_DEAD = 8;
const MARIO_RUN_LEFT = 9;
const MARIO_RUN_RIGHT = 10;


function Player(x, y, map, posMap) {
	// Loading sprite sheets
	var mario = new Texture("imgs/mario.png");

	// Prepare Bub sprite & its animations
	// this.marioSprite = new Sprite(x, y, 32, 32, 7, mario);
	// this.superMarioSprite = new Sprite(x, y, 32, 32, 7, mario);
	this.sprite = new Sprite(x, y, 32, 32, 7, mario);

	this.posMap = posMap;


	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_LEFT, [32, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STAND_RIGHT, [0, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [32, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [0, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [0, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [16, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_LEFT, [16, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [32, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_WALK_RIGHT, [16, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_R, [32, 32, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STOP_JUMP_R, [32, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_JUMP_L, [16, 32, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_STOP_JUMP_L, [0, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_DEAD, [48, 0, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_RUN_LEFT, [32, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_RUN_LEFT, [0, 16, 16, 16]);
	this.sprite.addKeyframe(MARIO_RUN_LEFT, [16, 16, 16, 16]);

	this.sprite.addAnimation();
	this.sprite.addKeyframe(MARIO_RUN_RIGHT, [0, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_RUN_RIGHT, [32, 0, 16, 16]);
	this.sprite.addKeyframe(MARIO_RUN_RIGHT, [16, 0, 16, 16]);

	this.sprite.setAnimation(MARIO_STAND_RIGHT);

	// Set tilemap for collisions
	this.map = map;

	this.animjump = false;
	this.direccionjump = "R";

	// Set attributes for jump
	this.bJumping = false;
	this.jumpAngle = 0;

	this.m_dead = false;
	this.c_dead = 0;

	this.speed = 0;
	this.mata = false;

	this.romper = false;
}

let minWalkSpeed = 60;
let walkAccel = 60;
let runAccel = 120;
let releaseDecel = 360;
let maxWalkSpeed = 120;
let maxRunSpeed = 240;

Player.prototype.moveMario = function (deltaTime) {
	let accel = 0;

	if (this.m_dead) {
		return;
	}

	if ((keyboard[37] || keyboard[39]) && !(keyboard[37] && keyboard[39])) {
		// Pressing move buttons
		if (keyboard[37] && (this.speed > -minWalkSpeed))
			this.speed = -minWalkSpeed;
		else if (keyboard[39] && (this.speed < minWalkSpeed))
			this.speed = minWalkSpeed;
		// Prepare acceleration according to action (walk or run)
		if (keyboard[16]) {
			if (keyboard[37])
				accel = -runAccel;
			else
				accel = runAccel;
		}
		else {
			if (keyboard[37])
				accel = -walkAccel;
			else
				accel = walkAccel;
		}
	}
	else {
		if (this.speed > 0)
			accel = -releaseDecel;
		else if (this.speed < 0)
			accel = releaseDecel;
		else
			accel = 0;
	}

	//save previous x position
	let prevX = this.sprite.x;

	// Move according to current speed
	this.sprite.x = this.sprite.x + this.speed * deltaTime / 1000.0;

	//check for collisions
	//if speed is positive, use collisionMoveRight, else use collisionMoveLeft

	if ((this.speed > 0 && this.map.collisionMoveRight(this.collisionBox()))
	|| (this.speed < 0 && this.map.collisionMoveLeft(this.collisionBox())))
	this.sprite.x = prevX;


	// Apply acceleration to current speed
	if ((keyboard[37] || keyboard[39]) && !(keyboard[37] && keyboard[39])) {
		this.speed = this.speed + accel * deltaTime / 1000.0;

		// Respect maximum speeds
		if (keyboard[16]) {
			if (Math.abs(this.speed) > maxRunSpeed) {
				if (this.speed > 0)
					this.speed = maxRunSpeed;
				else
					this.speed = -maxRunSpeed;
			}
		}
		else {
			if (Math.abs(this.speed) > maxWalkSpeed) {
				if (this.speed > 0)
					this.speed = maxWalkSpeed;
				else
					this.speed = -maxWalkSpeed;
			}
		}
	}
	else {
		// Be careful to stop when current acceleration gets close to zero
		if (this.speed > 0) {
			this.speed = this.speed + accel * deltaTime / 1000.0;
			if (this.speed < minWalkSpeed)
				this.speed = 0;
		}
		else if (this.speed < 0) {
			this.speed = this.speed + accel * deltaTime / 1000.0;
			if (this.speed > -minWalkSpeed)
				this.speed = 0;
		}
	}

	// Set animation according to current speed
	if (this.speed > 0) {
		if (!this.animjump) {
			if (this.speed > 120 && this.sprite.currentAnimation != MARIO_RUN_RIGHT)
				this.sprite.setAnimation(MARIO_RUN_RIGHT);

			if (this.speed < 120 && this.sprite.currentAnimation != MARIO_WALK_RIGHT)
				this.sprite.setAnimation(MARIO_WALK_RIGHT);
		} else {
			if (this.sprite.currentAnimation != MARIO_JUMP_R)
				this.sprite.setAnimation(MARIO_JUMP_R);
		}
		this.direccionjump = "R";
	} else if (this.speed < 0) {
		if (!this.animjump) {
			if (this.speed < -120 && this.sprite.currentAnimation != MARIO_RUN_LEFT)
				this.sprite.setAnimation(MARIO_RUN_LEFT);
			if (this.speed > -120 && this.sprite.currentAnimation != MARIO_WALK_LEFT)
				this.sprite.setAnimation(MARIO_WALK_LEFT);
		} else {
			if (this.sprite.currentAnimation != MARIO_JUMP_L)
				this.sprite.setAnimation(MARIO_JUMP_L);
		}
		this.direccionjump = "L";
	} else {
		
		if (this.sprite.currentAnimation == MARIO_WALK_LEFT)
			this.sprite.setAnimation(MARIO_STAND_LEFT);
		if (this.sprite.currentAnimation == MARIO_WALK_RIGHT)
			this.sprite.setAnimation(MARIO_STAND_RIGHT);
	}
	// TODO add double animation for running

	// Check arrow up key. If pressed, jump.
	if (this.speed < 0 && keyboard[38]) {
		if (this.sprite.currentAnimation != MARIO_JUMP_L)
			this.sprite.setAnimation(MARIO_JUMP_L);

		this.animjump = true;
		this.direccionjump = "L";

	} else if (this.speed > 0 && keyboard[38]) // KEY_RIGHT
	{
		if (this.sprite.currentAnimation != MARIO_JUMP_R)
			this.sprite.setAnimation(MARIO_JUMP_R);

		this.animjump = true;
		this.direccionjump = "R";
	} else if (keyboard[38]) // KEY_UP
	{
		if (this.direccionjump == "L") {
			if (this.sprite.currentAnimation != MARIO_JUMP_L)
				this.sprite.setAnimation(MARIO_JUMP_L);
		} else {
			if (this.sprite.currentAnimation != MARIO_JUMP_R)
				this.sprite.setAnimation(MARIO_JUMP_R);
		}

		this.animjump = true;
	}

	if (this.sprite.x < -2 + this.posMap) {
		this.sprite.x = -2 + this.posMap; 
	} else if (this.sprite.x > 480  + this.posMap) {
		this.sprite.x = 480 + this.posMap;
	}
}

Player.prototype.update = function (deltaTime) {


	if (this.mata){
		this.mata=this.mata;
	}
	if (this.m_dead) {
		if (this.sprite.currentAnimation != MARIO_DEAD)
			this.sprite.setAnimation(MARIO_DEAD);
		if (this.c_dead < 5) {
			this.sprite.y -= 16;
		} else if (this.c_dead > 80 && this.c_dead < 100) {
			this.sprite.y += 2;
		}

		this.c_dead = this.c_dead + 1;
	}

	if (this.bJumping) {
		this.jumpAngle += 4;
		if (this.jumpAngle == 180) {
			this.bJumping = false;
			this.sprite.y = this.startY;
			
				
			if (this.direccionjump == "R") {
				
				if (this.speed > 0) {
					
					if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
						this.sprite.setAnimation(MARIO_WALK_RIGHT);
				} else {
					
					if (this.sprite.currentAnimation != MARIO_STOP_JUMP_R)
						this.sprite.setAnimation(MARIO_STOP_JUMP_R);
				}
			} else {
				if (this.speed < 0) {
					if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
						this.sprite.setAnimation(MARIO_WALK_LEFT);
				} else {
					if (this.sprite.currentAnimation != MARIO_STOP_JUMP_L)
						this.sprite.setAnimation(MARIO_STOP_JUMP_L);
				}
			}

		}
		else {

			this.sprite.y = this.startY - 96 * Math.sin(3.14159 * this.jumpAngle / 180);
			if (this.jumpAngle > 90) {
				this.bJumping = !this.map.collisionMoveDown(this.collisionBox(), this.sprite);
			}else{
				this.bJumping = !this.map.collisionMoveUP(this.collisionBox(), this.sprite,this.romper);
				if (!this.bJumping) {
					if (this.animjump) {

						if (this.direccionjump == "R") {
				
							if (this.speed > 0) {
								
								if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
									this.sprite.setAnimation(MARIO_WALK_RIGHT);
							} else {
								
								if (this.sprite.currentAnimation != MARIO_STOP_JUMP_R)
									this.sprite.setAnimation(MARIO_STOP_JUMP_R);
							}
						} else {
							if (this.speed < 0) {
								if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
									this.sprite.setAnimation(MARIO_WALK_LEFT);
							} else {
								if (this.sprite.currentAnimation != MARIO_STOP_JUMP_L)
									this.sprite.setAnimation(MARIO_STOP_JUMP_L);
							}
						}
		
						this.animjump = false;
					}
				}
			}

		}

		if (!this.bJumping){
			this.mata = false;
		}
	}
	else {
		// Move Bub so that it is affected by gravity
		this.sprite.y += 4;
		//console.log(this.map.collisionMoveDown(this.collisionBox(), this.sprite));
		if (!this.m_dead && this.map.collisionMoveDown(this.collisionBox(), this.sprite)) {

			//this.sprite.y -= 2;

			// Check arrow up key. If pressed, jump.
			if (keyboard[38] && !this.m_dead) {
				this.bJumping = true;
				this.jumpAngle = 0;
				this.startY = this.sprite.y;
			} else if (this.animjump) {
				if (this.direccionjump == "R") {
				
					if (this.speed > 0) {
						
						if (this.sprite.currentAnimation != MARIO_WALK_RIGHT)
							this.sprite.setAnimation(MARIO_WALK_RIGHT);
					} else {
						
						if (this.sprite.currentAnimation != MARIO_STOP_JUMP_R)
							this.sprite.setAnimation(MARIO_STOP_JUMP_R);
					}
				} else {
					if (this.speed < 0) {
						if (this.sprite.currentAnimation != MARIO_WALK_LEFT)
							this.sprite.setAnimation(MARIO_WALK_LEFT);
					} else {
						if (this.sprite.currentAnimation != MARIO_STOP_JUMP_L)
							this.sprite.setAnimation(MARIO_STOP_JUMP_L);
					}
				}

				this.animjump = false;
			}
		}

	}



	if (this.sprite.y>400){
		this.m_dead = true;
	}

	// Update sprites
	this.sprite.update(deltaTime);
}

Player.prototype.draw = function () {
	this.sprite.draw();
}

Player.prototype.collisionBox = function () {
	var box = new Box(this.sprite.x + 4, this.sprite.y, this.sprite.x + this.sprite.width - 5, this.sprite.y + this.sprite.height - 1);
	return box;
}

Player.prototype.dead = function () {
	this.m_dead = true;
}

Player.prototype.collisionPosition = function (posM,posE){
	//console.log(posM);


	// Calcular las coordenadas del punto central en cada dimensión
    var centerMX = (posM.max_x + posM.min_x) / 2;
    var centerMY = (posM.max_y + posM.min_y) / 2;

    // Mostrar el punto central en la consola
    /*console.log("Punto central:");
    console.log("x:", centerMX);
    console.log("y:", centerMY);*/

	var centerM = { x: centerMX, y: centerMY };


	// Calcular las coordenadas del punto central en cada dimensión
    var centerEX = (posE.max_x + posE.min_x) / 2;
    var centerEY = (posE.max_y + posE.min_y) / 2;

    // Mostrar el punto central en la consola
    /*console.log("Punto central:");
    console.log("x:", centerEX);
    console.log("y:", centerEY);*/

	var centerE = { x: centerEX, y: centerEY };
    // Devolver el punto central como un objeto

	// Calcular las componentes del vector que apunta desde el centro de posM hacia el centro de posE
    var vectorX = centerEX - centerMX;
    var vectorY = centerEY - centerMY;

    // Crear el vector como un objeto con las componentes calculadas
    var collisionVector = { x: vectorX, y: vectorY };
	

	var angleradi = Math.atan2(collisionVector.y, collisionVector.x);
	
	var ang = (angleradi * 180) / Math.PI;
	
	//console.log(ang);


	var direction;
    //if (ang >= 45 && ang <= 135) {
	if (ang >= 45 && ang <= 75) {
        direction = "AbajoI";
    } else if (ang > 75 && ang <= 105){
		direction  = "Abajo";
	} else if (ang > 105 && ang <= 135){
		direction  = "AbajoD";
	}else  {
		direction = "Otra"
	}
    return direction;
}






