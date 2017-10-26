// MenuState

function MenuState() {
	this.imgBackground = ASSET_MANAGER.getAsset("titlescreen");
}

MenuState.prototype = new GameState();

MenuState.prototype.onStart = function() {
}

MenuState.prototype.update = function(gameTime) {
	if(mousePressed) {
		var state = new PlayingState();
		this.game.stateManager.changeState(state, gameTime);
	}
}

MenuState.prototype.draw = function(context, gameTime) {
	context.drawImage(this.imgBackground, 0, 0);
	var color = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
	context.fillStyle = color;
	context.font = "bold 20px arial";
	context.textAlign = "center";
	context.fillText("Click anywhere to start kicking some square asses!", 250, 190);
	context.font = "bold 32px arial";
	context.fillText("YOUR BEST", 380, 400);
	context.fillText(this.game.bestScore, 380, 440);
	context.strokeStyle = "#001030";
	context.font = "bold 20px arial";
	context.strokeText("Click anywhere to start kicking some square asses!", 250, 190);
	context.font = "bold 32px arial";
	context.strokeText("YOUR BEST", 380, 400);
	context.strokeText(this.game.bestScore, 380, 440);
}