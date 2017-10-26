// Particle

function Particle(gameTime, color) {
	this.width = 8;
	this.height = 8;
	this.velocityX = Math.random() * 0.8 - 0.4;
	this.velocityY = Math.random() * 0.8 - 0.4;
	this.timeLimit = gameTime + Math.floor(Math.random() * 700) + 300;
	this.lastUpdate = gameTime;
	this.color = color;
}

Particle.prototype = new GameObject();

Particle.prototype.draw = function(context, x, y) {
	context.fillStyle = this.color;
	context.fillRect(x, y, this.width, this.height);
}

Particle.prototype.update = function(gameTime) {
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
	
	if(gameTime > this.timeLimit) {
		this.state = -1;
	}
}