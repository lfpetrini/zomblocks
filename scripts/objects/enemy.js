// Enemy

function Enemy(gameTime) {
	this.width = 20;
	this.height = 20;
	this.lastUpdate = gameTime;
	this.rotation = 0;
	this.velocity = 0.08;
	// I hope I can save some processing with this
	this.currentChaseCooldown = 0;
	this.defaultChaseCooldown = 800;
	this.color = "#FF0000";
}

Enemy.prototype = new GameObject();

Enemy.prototype.draw = function(context, x, y) {
	context.fillStyle = this.color;
	context.fillRect(x, y, this.width, this.height);
}

Enemy.prototype.update = function(gameTime) {
	var elapsedTime = gameTime - this.lastUpdate;
	
	if(this.x < 0)
		this.x = 0;
	else if(this.x + this.width > this.map.widthInPixels)
		this.x = this.map.widthInPixels - this.width;
	if(this.y < 0)
		this.y = 0;
	else if(this.y + this.height > this.map.heightInPixels)
		this.y = this.map.heightInPixels - this.height;
		
	if(this.currentChaseCooldown > 0) {
		this.currentChaseCooldown -= elapsedTime;
	}
	else {
		var angle = Math.atan2(this.map.player.y - this.y, this.map.player.x - this.x);
		this.velocityX = this.velocity * Math.cos(angle);
		this.velocityY = this.velocity * Math.sin(angle);
		this.currentChaseCooldown = this.defaultChaseCooldown;
	}

	this.lastUpdate = gameTime;
}

Enemy.prototype.collide = function(object, gameTime) {
	if(object instanceof Bullet) {
		this.state = -1;
		ASSET_MANAGER.getAsset("death").play();
		this.map.player.score += 10;
		var pX = this.x + 10;
		var pY = this.y + 10;
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, "#FF0000");
			p.x = pX;
			p.y = pY;
			this.map.addObject(p);
		}
	}
}

// Harder Enemy

function HarderEnemy(gameTime) {
	this.lastUpdate = gameTime;
	this.width = 40;
	this.height = 40;
	this.velocity = 0.14;
	this.life = 3;
	this.color = "rgb(155,0,100)";
}

HarderEnemy.prototype = new Enemy();

HarderEnemy.prototype.update = function(gameTime) {
	var elapsedTime = gameTime - this.lastUpdate;
	
	if(this.x < 0)
		this.x = 0;
	else if(this.x + this.width > this.map.widthInPixels)
		this.x = this.map.widthInPixels - this.width;
	if(this.y < 0)
		this.y = 0;
	else if(this.y + this.height > this.map.heightInPixels)
		this.y = this.map.heightInPixels - this.height;
		
	if(this.currentChaseCooldown > 0) {
		this.currentChaseCooldown -= elapsedTime;
	}
	else {
		var angle = Math.atan2(this.map.player.y - this.y, this.map.player.x - this.x);
		this.velocityX = this.velocity * Math.cos(angle);
		this.velocityY = this.velocity * Math.sin(angle);
		this.currentChaseCooldown = this.defaultChaseCooldown;
	}

	this.lastUpdate = gameTime;
}

HarderEnemy.prototype.collide = function(object, gameTime) {
	if(object instanceof Bullet) {
		this.life--;
		if(this.life <= 0) {
			this.state = -1;
			ASSET_MANAGER.getAsset("death").play();
			this.map.player.score += 50;
			var pX = this.x + 10;
			var pY = this.y + 10;
			for(var i = 0; i < 15; i++) {
				var p = new Particle(gameTime, this.color);
				p.x = pX;
				p.y = pY;
				this.map.addObject(p);
			}
		}
		else {
			var pX = this.x + 10;
			var pY = this.y + 10;
			for(var i = 0; i < 8; i++) {
				var p = new Particle(gameTime, this.color);
				p.x = pX;
				p.y = pY;
				this.map.addObject(p);
			}
			var i = this.life - 1;
			var color = "rgb(" + (255 - i * 50) + ",0," + i * 50 + ")";
			this.color = color;
			this.width -= 10;
			this.height -= 10;
			this.x += 5;
			this.y += 5;
		}
	}
}

// Hardest Enemy

function HardestEnemy(gameTime) {
	this.lastUpdate = gameTime;
	this.width = 150;
	this.height = 150;
	this.velocity = 0.03;
	this.life = 20;
	this.color = "#c3971f";
}

HardestEnemy.prototype = new Enemy();

HardestEnemy.prototype.update = function(gameTime) {
	var elapsedTime = gameTime - this.lastUpdate;
	
	if(this.x < 0)
		this.x = 0;
	else if(this.x + this.width > this.map.widthInPixels)
		this.x = this.map.widthInPixels - this.width;
	if(this.y < 0)
		this.y = 0;
	else if(this.y + this.height > this.map.heightInPixels)
		this.y = this.map.heightInPixels - this.height;
		
	if(this.currentChaseCooldown > 0) {
		this.currentChaseCooldown -= elapsedTime;
	}
	else {
		var angle = Math.atan2(this.map.player.y - this.y, this.map.player.x - this.x);
		this.velocityX = this.velocity * Math.cos(angle);
		this.velocityY = this.velocity * Math.sin(angle);
		this.currentChaseCooldown = this.defaultChaseCooldown;
	}

	this.lastUpdate = gameTime;
}

HardestEnemy.prototype.collide = function(object, gameTime) {
	if(object instanceof Bullet) {
		this.life--;
		if(this.life <= 0) {
			this.state = -1;
			ASSET_MANAGER.getAsset("death").play();
			this.map.player.score += 50;
			for(var i = 0; i < 50; i++) {
				var p = new Particle(gameTime, this.color);
				p.x = this.x + Math.random() * this.width;
				p.y = this.y + Math.random() * this.height;;
				this.map.addObject(p);
			}
		}
	}
}