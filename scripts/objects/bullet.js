// Bullet

function Bullet(gameTime) {
	this.width = 5;
	this.height = 5;
	// pixels per milisecond
	this.velocity = 0.6;
	this.lastUpdate = gameTime;
}

Bullet.prototype = new GameObject();

Bullet.prototype.draw = function(context, x, y) {
	context.fillStyle = "#FFFF00";
	context.fillRect(x, y, this.width, this.height);
}

Bullet.prototype.update = function(gameTime) {
	if(this.x < 0) {
		this.state = -1;
		return;
	}
	if(this.x + this.width > this.map.widthInPixels) {
		this.state = -1;
		return;
	}
	if(this.y < 0) {
		this.state = -1;
		return;
	}
	if(this.y + this.height > this.map.heightInPixels) {
		this.state = -1;
		return;
	}
}

Bullet.prototype.collide = function(object, gameTime) {
	if(object instanceof Enemy) {
		this.state = -1;
		this.map.player.score += 5;
	}
}