// Player

function Player() {
	this.width = 20;
	this.height = 20;
	this.rotation = 0;
	this.powerUp = null;
	this.score = 0;
	this.setPowerUp(new DefaultPowerUpEffect(0));
}

Player.prototype = new GameObject();

Player.prototype.draw = function(context, x, y) {
	context.fillStyle = "#20596C";
	context.fillRect(x, y, this.width, this.height);
}

// I was goint to create an object to keep all the input states, but this lot of global vars works and I have no time to improve it
Player.prototype.update = function(gameTime) {
	var elapsedTime = gameTime - this.lastUpdate;
	
	this.velocityX = this.velocityY = 0;
		
	// Key Left A
	if(keyPressed[65] || keyPressed[37])
		this.velocityX = -this.powerUp.velocityX;
	// Key Up W
	if(keyPressed[38] || keyPressed[87])
		this.velocityY = -this.powerUp.velocityY;
	// Key D
	if(keyPressed[68] || keyPressed[39])
		this.velocityX = this.powerUp.velocityX;
	// Key Down S
	if(keyPressed[40] || keyPressed[83])
		this.velocityY = this.powerUp.velocityY;
	
	this.powerUp.update(gameTime);
	
	if(mousePressed) {
		this.powerUp.shoot(gameTime);
	}
	
	if(this.x < 0)
		this.x = 0;
	else if(this.x + this.width > this.map.widthInPixels)
		this.x = this.map.widthInPixels - this.width;
	if(this.y < 0)
		this.y = 0;
	else if(this.y + this.height > this.map.heightInPixels)
		this.y = this.map.heightInPixels - this.height;

	this.lastUpdate = gameTime;
}

Player.prototype.collide = function(object, gameTime) {
	if(object instanceof Enemy) {
		this.state = -1;
		ASSET_MANAGER.getAsset("death").play();
		this.score += parseInt(gameTime / 10);
		var pX = this.x + 10;
		var pY = this.y + 10;
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, "#20596C");
			p.x = pX;
			p.y = pY;
			this.map.addObject(p);
		}
	}
}

Player.prototype.setPowerUp = function(powerUp) {
	this.powerUp = powerUp;
	this.powerUp.player = this;
}