// Tilemap. Draws a tilemap using a texture as a tilesheet.
function Tilemap(tilesheet, tileSize, blockGrid, basePos, map) {
	this.tileSize = tileSize;
	this.basePos = basePos;
	this.blockGrid = blockGrid;
	this.map = map;

	this.tochos = [];

	this.tilesheet = tilesheet;

	this.lava = false;
}

Tilemap.prototype.draw = function () {
	// Only draw if tilesheet texture already loaded
	if (!this.tilesheet.isLoaded())
		return;

	// Size of each block in pixels
	blockSize = [this.tilesheet.width() / this.blockGrid[0], this.tilesheet.height() / this.blockGrid[1]];

	// Compute block positions in tilesheet
	var tilePositions = [];
	for (var y = 0, tileId = 0; y < this.blockGrid[1]; y++)
		for (var x = 0; x < this.blockGrid[0]; x++, tileId++)
			tilePositions.push([x * blockSize[0], y * blockSize[1]]);

	// Get canvas object, then its context
	var canvas = document.getElementById("game-layer");
	var context = canvas.getContext("2d");

	// Draw the map
	var tileId;
	context.imageSmoothingEnabled = false;
	for (var j = 0, pos = 0; j < this.map.height; j++)
		for (var i = 0; i < this.map.width; i++, pos++) {
			tileId = this.map.layers[0].data[pos];
			if (tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId - 1][0], tilePositions[tileId - 1][1], blockSize[0], blockSize[1],
					this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
		}


	for (var j = 0, pos = 0; j < this.map.height; j++)
		for (var i = 0; i < this.map.width; i++, pos++) {
			tileId = this.map.layers[1].data[pos];
			if (tileId != 0)
				context.drawImage(this.tilesheet.img, tilePositions[tileId - 1][0], tilePositions[tileId - 1][1], blockSize[0], blockSize[1],
					this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
		}
	if (this.map.layers.length > 2) {

		for (var j = 0, pos = 0; j < this.map.height; j++)
			for (var i = 0; i < this.map.width; i++, pos++) {
				var skipTile = false;
				for (var k = 0; k < this.tochos.length; k++) {
					if (this.tochos[k][0] === i && this.tochos[k][1] === j) {
						skipTile = true;
						break;
					}
				}

				if (!skipTile) {
					tileId = this.map.layers[2].data[pos];
					if (tileId != 0)
						context.drawImage(this.tilesheet.img, tilePositions[tileId - 1][0], tilePositions[tileId - 1][1], blockSize[0], blockSize[1],
							this.basePos[0] + this.tileSize[0] * i, this.basePos[1] + this.tileSize[1] * j, blockSize[0], blockSize[1]);
				}
			}
	}
}

// Computes if the left part of a sprite collides with the tilemap.
// Returns a boolean with the result.
Tilemap.prototype.collisionMoveLeft = function (box) {

	var x = Math.floor((box.min_x - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((box.min_y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((box.max_y + this.basePos[1]) / this.tileSize[1]);

	for (var y = y0; y <= y1; y++) {
		//console.log(this.map.layers[0].data[y * this.map.width + x]);
		if (this.map.layers[0].data[y * this.map.width + x] != 0 || this.map.layers[2].data[y * this.map.width + x] != 0)
			return true;
	}

	return false;
}

// Computes if the right part of a sprite collides with the tilemap.
// Returns a boolean with the result.
Tilemap.prototype.collisionMoveRight = function (box) {

	var x = Math.floor((box.max_x - this.basePos[0]) / this.tileSize[0]);
	var y0 = Math.floor((box.min_y - this.basePos[1]) / this.tileSize[1]);
	var y1 = Math.floor((box.max_y - this.basePos[1]) / this.tileSize[1]);

	for (var y = y0; y <= y1; y++)
		if (this.map.layers[0].data[y * this.map.width + x] != 0 || this.map.layers[2].data[y * this.map.width + x] != 0)
			return true;

	return false;
}

// Computes if the bottom of a sprite collides with the tilemap.
// Returns a boolean with the result, and if it collides, it changes its Y position so as to avoid it.
Tilemap.prototype.collisionMoveDown = function (box, sprite) {
	var y = Math.floor((box.max_y - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((box.min_x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((box.max_x - this.basePos[0]) / this.tileSize[0]);

	for (var x = x0; x <= x1; x++) {
		var skipTile = false;
		for (var k = 0; k < this.tochos.length; k++) {
			if (this.tochos[k][0] === x && this.tochos[k][1] === y) {
				skipTile = true;
				break;
			}
		}

		if (!skipTile) {
			if (this.map.layers[0].data[y * this.map.width + x] == 9)
				this.lava = true;
			if (this.map.layers[0].data[y * this.map.width + x] != 0 || this.map.layers[2].data[y * this.map.width + x] != 0) {
				sprite.y = y * this.tileSize[1] - sprite.height + this.basePos[1];
				return true;
			}
		}
	}

	return false;
}

Tilemap.prototype.collisionMoveUP = function (box, sprite, romper) {
	var res = false;
	var y = Math.floor((box.min_y - this.basePos[1]) / this.tileSize[1]);
	var x0 = Math.floor((box.min_x - this.basePos[0]) / this.tileSize[0]);
	var x1 = Math.floor((box.max_x - this.basePos[0]) / this.tileSize[0]);

	for (var x = x0; x <= x1; x++) {
		var skipTile = false;
		for (var k = 0; k < this.tochos.length; k++) {
			if (this.tochos[k][0] === x && this.tochos[k][1] === y) {
				skipTile = true;
				break;
			}
		}

		if (!skipTile) {
			if (this.map.layers[0].data[y * this.map.width + x] != 0 || this.map.layers[2].data[y * this.map.width + x] != 0) {
				sprite.y = (y + 1) * this.tileSize[1] + this.basePos[1];
				res = true;
			}
		}

		if (romper && this.map.layers[2].data[y * this.map.width + x] == 18)
			this.tochos.push([x, y]);
	}
	return res;
}