function Game() {
	this.CANVAS_WIDTH = 500;
	this.CANVAS_HEIGHT = 500;
	this.MAXIMUM_FPS = 30;
	this.lastSystemTime = 0;
	this.gameTime = 0;
	this.isPaused = false;
	this.stateManager = new GameStateManager(this);
	this.bestScore = 0;
}

Game.prototype.init = function (context) {
	// Load assets and then start canvas
	ASSET_MANAGER.queueDownloadableAudio("res/audio/shot.ogg", "shot");
	ASSET_MANAGER.queueDownloadableAudio("res/audio/death.ogg", "death");
	ASSET_MANAGER.queueDownloadableAudio("res/audio/powerup.ogg", "powerup");
	ASSET_MANAGER.queueDownloadableAudio("res/audio/track.ogg", "track");
	ASSET_MANAGER.queueDownloadableImage("res/images/title.png", "titlescreen");
	ASSET_MANAGER.queueDownloadableText("res/map.map", "map");
	
	// Reference to use in the anonymous functions
	var game = this;

	// Draw the loading screen
	var loading = setInterval(function() {
		if(ASSET_MANAGER.loadedResources >= ASSET_MANAGER.getTotal()) {
			clearInterval(loading);
			return;
		}
		context.clearRect(0, 0, game.CANVAS_WIDTH, game.CANVAS_HEIGHT);
		context.fillStyle = "#FFFFFF";
		context.font = "bold 32px sans-serif";
		context.textAlign = "center";
		if(ASSET_MANAGER.errorResources == 0)
			context.fillText("LOADING ASSETS: " + ASSET_MANAGER.loadedResources + " of " + ASSET_MANAGER.getTotal(), 250, 200);
		else
			context.fillText("LOADING ERROR.", 250, 200);
	}, 200);

	// EVERYTHING IS LOADED :D
	ASSET_MANAGER.downloadAssets(function() {
		if(ASSET_MANAGER.errorResources > 0) {
			alert("Loading ERROR");
			return;
		}
		
		var state = new MenuState();
		game.stateManager.changeState(state, 0);
		
		// MAIN LOOP
		game.startGameTime();
		ASSET_MANAGER.getAsset("track").playLoop();
		setInterval(function() {
			game.mainLoop(context);
		}, 1000/game.MAXIMUM_FPS);
	});
}
		
Game.prototype.getGameTime = function() {
	var currentSystemTime = Date.now();
	if(!this.isPaused)
		this.gameTime += (currentSystemTime - this.lastSystemTime);
	this.lastSystemTime = currentSystemTime;
	return this.gameTime;
}
		
Game.prototype.startGameTime = function() {
	this.gameTime = 0;
	this.lastSystemTime = Date.now();
}

Game.prototype.mainLoop = function(context) {
	this.stateManager.updateAndDraw(context, this.getGameTime());
}