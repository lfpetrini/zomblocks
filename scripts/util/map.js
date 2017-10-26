// Map

function GameMap(game) {
	this.tileColors = Array();
	this.tiles = Array();
	this.objects = Array();
	this.objectsToRemove = Array();
	this.width = 0;
	this.height = 0;
	this.widthInPixels = 0;
	this.heightInPixels = 0;
	this.tileWidth = 0;
	this.tileHeight = 0;
	this.lastUpdate = 0;
	this.player = null;
	this.game = game;
}

GameMap.prototype.addObject = function(obj) {
	this.objects.push(obj);
	obj.map = this;
}

GameMap.prototype.start = function(gameTime) {
	this.lastUpdate = gameTime;
}

GameMap.prototype.loadFromString = function(string, ASSET_MANAGER) {
	// slashes = regular expression
	// ending g = global replace
	// first converts \r\n to \n and then \n to a single space. Last one is used to convert more than one space into a single one
	var str = string.replace(/\r\n/g, "\n").replace(/\n/g, " ").replace(/\s{2,}/g, " ");
	str = str.split(" ");
	if(str.length < 5)
		return false;
	
	// read map size
	this.width = parseInt(str[0]);
	this.height = parseInt(str[1]);
	this.tiles = Array(this.width);
	
	// read tile size
	this.tileWidth = parseInt(str[2]);
	this.tileHeight = parseInt(str[3]);
	this.tiles = Array(this.width);
	
	this.widthInPixels = this.tileWidth * this.width;
	this.heightInPixels = this.tileHeight * this.height;
	
	// player position
	var player = new Player();
	player.x = parseInt(str[4]);
	player.y = parseInt(str[5]);
	this.addObject(player);
	this.player = player;
	
	// read tile colors
	var current = 6;
	while(str[current] != "end") {
		this.tileColors.push(str[current]);
		current++;
	}

	// allocate space for tile matrix
	for(var i = 0; i < this.width; i++) {
		this.tiles[i] = Array(this.height);
	}

	var i = current + 1;
	for(var y = 0; y < this.height; y++)
		for(var x = 0; x < this.width && i < str.length; x++) {
			this.tiles[x][y] = str[i];
			i++;
		}
}

GameMap.prototype.draw = function(context, tileX, tileY, width, height) {
	var lastX = Math.min(tileX + width, this.width);
	var lastY = Math.min(tileY + height, this.height);
	
	var widthInPixels = (lastX - tileX) * this.tileWidth;
	var heightInPixels = (lastY - tileY) * this.tileHeight;
	
	var mapStartX = this.tileWidth * tileX;
	var mapStartY = this.tileHeight * tileY;
	
	// this block exists so we can start drawing from outsite the map (negative values)
	// and it will be drawn in the right position (negative tiles will not be drawn, just like if they were transparent)
	var startPositionX = (tileX < 0) ? this.tileWidth * Math.abs(tileX) : 0;
	var startPositionY = (tileY < 0) ? this.tileHeight * Math.abs(tileY) : 0;
	var tileX = Math.max(tileX, 0);
	var tileY = Math.max(tileY, 0);
	// enf of block
	
	context.fillStyle = "#00AAFF";
	context.fillRect(startPositionX, startPositionY, widthInPixels, heightInPixels);
	

	var positionY = startPositionY;var positionY = startPositionY;
	for(var y = tileY; y < lastY; y++) {
		var positionX = startPositionX;
		for(var x = tileX; x < lastX; x++) {
			context.fillStyle = this.tileColors[this.tiles[x][y]];
			context.fillRect(positionX, positionY, this.tileWidth, this.tileHeight);
			positionX += this.tileWidth;
		}
		positionY += this.tileHeight;
	}
	
	// get a list of objects which appear in the camera frame
	objectsToDraw = Array();
	for(var i = 0; i < this.objects.length; i++)
		if(checkRectIntersection(this.objects[i].x, this.objects[i].y, this.objects[i].width, this.objects[i].height, mapStartX, mapStartY, widthInPixels, heightInPixels))
			objectsToDraw.push(this.objects[i]);

	for(var i = 0; i < objectsToDraw.length; i++)
		objectsToDraw[i].draw(context, objectsToDraw[i].x - mapStartX, objectsToDraw[i].y - mapStartY);
}

GameMap.prototype.update = function(gameTime) {
	var elapsedTime = gameTime - this.lastUpdate;
	
	// Handle movement
	for(var i = 0; i < this.objects.length; i++) {
		var obj = this.objects[i];
		obj.x += obj.velocityX * elapsedTime;
		obj.y += obj.velocityY * elapsedTime;
	}
	
	// Handle objects
	for(var i = 0; i < this.objects.length; i++) {
		var obj = this.objects[i];
		
		// Check collision with other objects
		for(var j = i + 1; j < this.objects.length; j++) {
			var obj2 = this.objects[j];
			if(obj.state == -1)
				break;
			if(obj2.state == -1)
				continue;
			if(checkRectIntersection(obj.x, obj.y, obj.width, obj.height, obj2.x, obj2.y, obj2.width, obj2.height)) {
				obj.collide(obj2, gameTime);
				obj2.collide(obj, gameTime);
			}
		}
		
		obj.update(gameTime);
		
		if(obj.state == -1) {
			this.objectsToRemove.push(i);
		}
	}
	
	// Delete unnecessary objects
	for(var i = this.objectsToRemove.length - 1; i >= 0; i--) {
		this.objects.splice(this.objectsToRemove[i], 1);
	}
	
	this.objectsToRemove = Array();
	
	this.lastUpdate = gameTime;
}