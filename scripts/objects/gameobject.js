// GameObject

function GameObject() {
	this.x = 0;
	this.y = 0;
	this.velocityX = 0;
	this.velocityY = 0;
	this.width = 0;
	this.height = 0;
	this.lastUpdate = 0;
	this.state = 0;
	this.map = null;
}

GameObject.prototype.draw = function(context, x, y) {
}

GameObject.prototype.update = function(gameTime) {
}

GameObject.prototype.collide = function(object, gameTime) {
}