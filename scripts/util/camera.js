// Camera

function MapCamera(map) {
	this.map = map;
	this.width = 0;
	this.height = 0;
	this.x = 0;
	this.y = 0;
}

MapCamera.prototype.setSize = function(width, height) {
	this.width = width;
	this.height = height;
}

MapCamera.prototype.centerAt = function(x, y) {
	if(y == null) {
		// center at object X
	}
	else {
		//center at position X, Y
		this.x = x - this.width / 2;
		this.y = y - this.height / 2;
	}
}

MapCamera.prototype.draw = function(context, x, y, width, height) {
	// since we'll draw the map starting from a multiple of the tile sizes
	// and then position the result as we want, we'll add some extra space
	// at the end to guarantee everything will be shown
	var tempCanvas = getTempCanvas(this.width + this.map.tileWidth, this.height + this.map.tileHeight);
	var tileX = Math.floor(this.x / this.map.tileWidth);
	var tileY = Math.floor(this.y / this.map.tileHeight);
	var tilesWidth = Math.ceil(this.width / this.map.tileWidth) + 1;
	var tilesHeight = Math.ceil(this.height / this.map.tileHeight) + 1;
	this.map.draw(tempCanvas.getContext("2d"), tileX, tileY, tilesWidth, tilesHeight);
	//context.drawImage(this.map.imgTiles[1], 12, 12, 12, 12, 24, 24, 48, 48);
	//alert("  " + this.x % this.map.tileWidth + "  " + this.y % this.map.tileHeight + "  " + this.width + "  " + this.height + "  " + x + "  " + y + "  " + width + "  " + height);
	var posX = this.x % this.map.tileWidth;
	var posY = this.y % this.map.tileHeight;
	if(posX < 0) 
		posX += this.map.tileWidth;
	if(posY < 0) 
		posY += this.map.tileHeight;
	
	context.drawImage(tempCanvas, posX, posY < 0 ? 0 : posY, this.width, this.height, x, y, width, height);
	//delete tempCanvas;
}