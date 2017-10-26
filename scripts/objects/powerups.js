// PowerUps

function PowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "#000000";
}

PowerUp.prototype = new GameObject();

PowerUp.prototype.draw = function(context, x, y) {
	fillCircle(context, x + 10, y + 10, 10, this.color);
}

PowerUp.prototype.update = function(gameTime) {
	if(gameTime > this.timeLimit)
		this.state = -1;
}

//MACHINE GUN
function MachineGunPowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "#00FF00";
}

MachineGunPowerUp.prototype = new PowerUp();

MachineGunPowerUp.prototype.collide = function(object, gameTime) {
	if(object instanceof Player) {
		this.state = -1;
		ASSET_MANAGER.getAsset("powerup").play();
		object.setPowerUp(new MachineGunPowerUpEffect(gameTime));
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, this.color);
			p.x = this.x + 10;
			p.y = this.y + 10;
			this.map.addObject(p);
		}
	}
}

//SHOTGUN
function ShotgunPowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "#00FFAA";
}

ShotgunPowerUp.prototype = new PowerUp();

ShotgunPowerUp.prototype.collide = function(object, gameTime) {
	if(object instanceof Player) {
		this.state = -1;
		ASSET_MANAGER.getAsset("powerup").play();
		object.setPowerUp(new ShotgunPowerUpEffect(gameTime));
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, this.color);
			p.x = this.x + 10;
			p.y = this.y + 10;
			this.map.addObject(p);
		}
	}
}

//SPEED
function SpeedPowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "#FFFFFF";
}

SpeedPowerUp.prototype = new PowerUp();

SpeedPowerUp.prototype.collide = function(object, gameTime) {
	if(object instanceof Player) {
		this.state = -1;
		ASSET_MANAGER.getAsset("powerup").play();
		object.setPowerUp(new SpeedPowerUpEffect(gameTime));
		var pX = this.x + 10;
		var pY = this.y + 10;
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, this.color);
			p.x = pX;
			p.y = pY;
			this.map.addObject(p);
		}
	}
}

//RANDOM
function RandomPowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
}

RandomPowerUp.prototype = new PowerUp();

RandomPowerUp.prototype.update = function(gameTime) {
	if(gameTime > this.timeLimit)
		this.state = -1;
	this.color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
}

RandomPowerUp.prototype.collide = function(object, gameTime) {
	if(object instanceof Player) {
		this.state = -1;
		var p;
		r = Math.floor(Math.random() * 5);
		switch(r) {
			case 0: p = new MachineGunPowerUp(gameTime);
			break;
			case 1: p = new ShotgunPowerUp(gameTime);
			break;
			case 2: p = new SpeedPowerUp(gameTime);
			break;
			case 3: p = new TempOrbPowerUp(gameTime);
			break;
			case 4: p = new PermanentOrbPowerUp(gameTime);
			break;
		}
		p.x = object.x;
		p.y = object.y;
		this.map.addObject(p);
	}
}

// Temp Orb
function TempOrbPowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "#64176b";
}

TempOrbPowerUp.prototype = new PowerUp();

TempOrbPowerUp.prototype.collide = function(object, gameTime) {
	if(object instanceof Player) {
		this.state = -1;
		ASSET_MANAGER.getAsset("powerup").play();
		
		var orb = new Orb(gameTime, object);
		orb.rpms = 0.01;
		orb.distance = 50;
		orb.timeLimit = gameTime + 10000;
		orb.autoDestroy = false;
		this.map.addObject(orb);
		orb = new Orb(gameTime, object);
		orb.rpms = 0.01;
		orb.distance = 50;
		orb.timeLimit = gameTime + 10000;
		orb.autoDestroy = false;
		orb.rotation = Math.PI;
		this.map.addObject(orb);
		
		var pX = this.x + 10;
		var pY = this.y + 10;
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, this.color);
			p.x = pX;
			p.y = pY;
			this.map.addObject(p);
		}
	}
}

// Permanent Orb
function PermanentOrbPowerUp(gameTime) {
	this.width = 20;
	this.height = 20;
	this.timeLimit = gameTime + 10000;
	this.lastUpdate = gameTime;
	this.color = "#ae76b3";
}

PermanentOrbPowerUp.prototype = new PowerUp();

PermanentOrbPowerUp.prototype.collide = function(object, gameTime) {
	if(object instanceof Player) {
		this.state = -1;
		ASSET_MANAGER.getAsset("powerup").play();
		
		var orb = new Orb(gameTime, object);
		this.map.addObject(orb);
		orb = new Orb(gameTime, object);
		orb.rotation = 2.09439;
		this.map.addObject(orb);
		orb = new Orb(gameTime, object);
		orb.rotation = 4.18879;
		this.map.addObject(orb);
		
		var pX = this.x + 10;
		var pY = this.y + 10;
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, this.color);
			p.x = pX;
			p.y = pY;
			this.map.addObject(p);
		}
	}
}




// EFFECTS

// DEFAULT
function DefaultPowerUpEffect(gameTime) {
	this.defaultCooldown = 500;
	this.velocityX = 0.12;
	this.velocityY = 0.12;
	this.lastShot = 0;
	this.timeLimit = 0;
	this.lastUpdate = gameTime;
	this.player = null;
}
DefaultPowerUpEffect.prototype.update = function(gameTime) {
	if(gameTime > this.timeLimit)
		this.onTimeOver(gameTime);
}
DefaultPowerUpEffect.prototype.shoot = function(gameTime) {
	if((gameTime - this.lastShot) > this.defaultCooldown) {
		ASSET_MANAGER.getAsset("shot").play();
		var bullet = new Bullet(gameTime);
		bullet.x = this.player.x + 7;
		bullet.y = this.player.y + 7;
		bullet.velocityX = bullet.velocity * Math.cos(this.player.rotation);
		bullet.velocityY = bullet.velocity * Math.sin(this.player.rotation);
		this.player.map.addObject(bullet);
		this.lastShot = gameTime;
	}
}
DefaultPowerUpEffect.prototype.onTimeOver = function(gameTime) {
}

// SHOTGUN
function ShotgunPowerUpEffect(gameTime) {
	this.defaultCooldown = 800;
	this.timeLimit = gameTime + 6000;
	this.lastUpdate = gameTime;
}
ShotgunPowerUpEffect.prototype = new DefaultPowerUpEffect();
ShotgunPowerUpEffect.prototype.onTimeOver = function(gameTime) {
	this.player.setPowerUp(new DefaultPowerUpEffect(gameTime));
}
ShotgunPowerUpEffect.prototype.shoot = function(gameTime) {
	if((gameTime - this.lastShot) > this.defaultCooldown) {
		ASSET_MANAGER.getAsset("shot").play();
		var bulletX = this.player.x + 7;
		var bulletY = this.player.y + 7;
		var rotation = this.player.rotation - 0.39269875;
		for(var i = 0; i < 10; i++) {
			var bullet = new Bullet(gameTime);
			// bullets will be shot in a range of 45 degrees
			//var bulletDirection = this.player.rotation + Math.random() * 0.7853975 - 0.39269875;
			var bulletDirection = rotation + Math.random() * 0.7853975;
			bullet.x = bulletX;
			bullet.y = bulletY;
			bullet.velocityX = bullet.velocity * Math.cos(bulletDirection);
			bullet.velocityY = bullet.velocity * Math.sin(bulletDirection);
			this.player.map.addObject(bullet);
		}
		this.lastShot = gameTime;
	}
}

// MACHINE GUN
function MachineGunPowerUpEffect(gameTime) {
	this.defaultCooldown = 120;
	this.timeLimit = gameTime + 6000;
	this.lastUpdate = gameTime;
}
MachineGunPowerUpEffect.prototype = new DefaultPowerUpEffect();
MachineGunPowerUpEffect.prototype.onTimeOver = function(gameTime) {
	this.player.setPowerUp(new DefaultPowerUpEffect(gameTime));
}

// SPEED
function SpeedPowerUpEffect(gameTime) {
	this.defaultCooldown = 500;
	this.velocityX = 0.24;
	this.velocityY = 0.24;
	this.timeLimit = gameTime + 6000;
	this.lastUpdate = gameTime;
}
SpeedPowerUpEffect.prototype = new DefaultPowerUpEffect();
SpeedPowerUpEffect.prototype.onTimeOver = function(gameTime) {
	this.player.setPowerUp(new DefaultPowerUpEffect(gameTime));
}

// ORBS

// ORB OBJECT
function Orb(gameTime, object) {
	this.width = 20;
	this.height = 20;
	// almost one complete circle in one second
	this.rpms = 0.005;
	this.rotation = 0;
	this.distance = 100;
	this.object = object;
	this.timeLimit = 0;
	this.autoDestroy = true;
	this.lastUpdate = gameTime;
}

// This behaves like a bullet
Orb.prototype = new Bullet();

Orb.prototype.draw = function(context, x, y) {
	context.fillStyle = "rgba(255,0,255,0.5)";
	context.fillRect(x, y, this.width, this.height);
}

Orb.prototype.update = function(gameTime) {
	var elapsedTime = gameTime - this.lastUpdate;
	this.rotation += this.rpms * elapsedTime;
	this.x = this.object.x + this.distance * Math.cos(this.rotation);
	this.y = this.object.y + this.distance * Math.sin(this.rotation);
	
	if(this.timeLimit > 0 && gameTime > this.timeLimit) {
		this.state = -1;
	}
	
	this.lastUpdate = gameTime;
}

Orb.prototype.collide = function(object, gameTime) {
	if(object instanceof Enemy && this.autoDestroy) {
		this.state = -1;
		var pX = this.x + 10;
		var pY = this.y + 10;
		for(var i = 0; i < 15; i++) {
			var p = new Particle(gameTime, "rgba(255,0,255,0.5)");
			p.x = pX;
			p.y = pY;
			this.map.addObject(p);
		}
	}
}