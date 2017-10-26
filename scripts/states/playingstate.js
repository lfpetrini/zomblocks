// PlayingState

function PlayingState() {
	this.map = null;

	// Variables used to generate enemies
	this.addEnemyTimer = 0;
	this.harderEnemyMinChance = 0.1;
	this.hardestEnemyMinChance = 0.1;
	this.harderEnemyCurrentChance = 0.1;
	this.hardestEnemyCurrentChance = 0.1;
	this.harderEnemyModfier = 1.3;
	this.hardestEnemyModfier = 1.1;

	// Variables used to generate powerups
	this.addPowerUpTimer = 10000;
	
	// Variables used to draw
	this.cam = null;
}

PlayingState.prototype = new GameState();

PlayingState.prototype.onStart = function() {
	this.map = new GameMap(this.game);
	// Load Map and Tiles
	this.map.loadFromString(ASSET_MANAGER.getAsset("map"), ASSET_MANAGER);
	this.cam = new MapCamera(this.map);
	this.cam.x = 0;
	this.cam.y = 0;
	this.cam.width = 480;
	this.cam.height = 480;
}

PlayingState.prototype.addEnemy = function(gameTime) {
	if(gameTime > this.addEnemyTimer) {
		this.addEnemyTimer += 3000;
		var normalEnemies = Math.ceil(gameTime / 8000);
		var harderEnemiesTries = normalEnemies + Math.floor(gameTime / 10000);
		var hardestEnemiesTries = harderEnemiesTries + Math.floor(gameTime / 20000);
		var i = 0;
		while(i < hardestEnemiesTries) {
			var e = null;
			if(i < normalEnemies) {
				e = new Enemy(gameTime);
			}
			else if(i < harderEnemiesTries) {
				if(Math.random() <= this.harderEnemyCurrentChance) {
					this.harderEnemyCurrentChance = Math.max(this.harderEnemyCurrentChance / (2 * this.harderEnemyModfier), this.harderEnemyMinChance);
					e = new HarderEnemy(gameTime);
				}
				else {
					this.harderEnemyCurrentChance *= this.harderEnemyModfier;
				}
			}
			else if(i < hardestEnemiesTries) {
				if(Math.random() <= this.hardestEnemyCurrentChance) {
					this.hardestEnemyCurrentChance = Math.max(this.hardestEnemyCurrentChance / (2 * this.hardestEnemyModfier), this.hardestEnemyMinChance);
					e = new HardestEnemy(gameTime);
				}
				else {
					this.hardestEnemyCurrentChance *= this.hardestEnemyModfier;
				}
			}
			if(e != null) {
				do {
					// I know.. optimized.. no time
					e.x = Math.floor((Math.random() * (this.map.widthInPixels - e.width)));
					e.y = Math.floor((Math.random() * (this.map.heightInPixels - e.height)));
				}
				while(checkRectIntersection(e.x, e.y, e.width, e.height, this.map.player.x - 240, this.map.player.y - 240, 500, 500));
				this.map.addObject(e);
			}
			i++;
		}
	}
}

PlayingState.prototype.addPowerUp = function(gameTime) {
	if(gameTime > this.addPowerUpTimer) {
		this.addPowerUpTimer += 5000;
		var p, r;
		r = Math.floor(Math.random() * 6);
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
			case 5: p = new RandomPowerUp(gameTime);
			break;
		}

		do {
			// I know.. optimized.. no time
			p.x = Math.floor((Math.random() * (this.map.widthInPixels - p.width)));
			p.y = Math.floor((Math.random() * (this.map.heightInPixels - p.height)));
		}
		while(!checkRectIntersection(p.x, p.y, p.width, p.height, this.map.player.x - 240, this.map.player.y - 240, 500, 500));
		this.map.addObject(p);
	}
}

PlayingState.prototype.update = function(gameTime) {
	// I know this could be optimized but I got only 20 minutes left
	if(this.map.player.state != -1) {
		this.addEnemy(this.stateTime);
		this.addPowerUp(this.stateTime);
	}
	else {
		if(keyPressed[13]) {
			if(this.game.bestScore < this.map.player.score)
				this.game.bestScore = this.map.player.score;
			var state = new MenuState();
			this.game.stateManager.changeState(state);
		}
	}
	// I need to create a "lastMousePosition" and only do this math if the position changed
	this.map.player.rotation = Math.atan2(gameCanvas.getBoundingClientRect().top + 250 - mousePosition[1], gameCanvas.getBoundingClientRect().left + 250 - mousePosition[0]) - 3.14159;
	this.map.update(this.stateTime);
}

PlayingState.prototype.draw = function(context, gameTime) {
	context.clearRect(0, 0, this.game.CANVAS_WIDTH, this.game.CANVAS_HEIGHT);
	
	this.cam.centerAt(this.map.player.x + 10, this.map.player.y + 10);
	this.cam.draw(context, 0, 0, 500, 500);
	
	
	if(this.map.player.state == -1) {
		var color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
		context.fillStyle = color;
		context.font = "bold 32px arial";
		context.textAlign = "center";
		context.fillText("SCORE: " + parseInt(this.map.player.score), 250, 100);
		context.fillText("Press ENTER to return to menu!", 250, 400);
		context.strokeStyle = "#001030";
		context.strokeText("SCORE: " + parseInt(this.map.player.score), 250, 100);
		context.strokeText("Press ENTER to return to menu!", 250, 400);
	}
	else {
		context.fillStyle = "#FFFF00";
		context.font = "bold 18px arial";
		context.textAlign = "left";
		context.fillText("SCORE: " + parseInt(this.map.player.score + this.stateTime / 10), 2, 15);
		context.fillText("BEST: " + this.game.bestScore, 370, 15);
		context.strokeStyle = "#001030";
		context.strokeText("SCORE: " + parseInt(this.map.player.score + this.stateTime / 10), 2, 15);
		context.strokeText("BEST: " + this.game.bestScore, 370, 15);
	}
}