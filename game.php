<html>
<head>
	<link rel="image_src" href="res/images/title.png" />

	<title>Zomblocks Blockiller</title>
	<style type="text/css">
		body {
			text-align: center;
			background: #000;
			color: #FFFFFF;
		}
		a:link {
			color: #FFFFFF;
			text-decoration: underline;
		}
		a:visited {
			color: #FFFFFF;
			text-decoration: underline;
		}
		a:hover {
			color: #BBFFBB;
			text-decoration: none;
		}
		a:active {
			color: #FFBBBB;
			text-decoration: none;
		}
	</style>
	<script src="scripts/util/util.js"></script>
	<script src="scripts/util/assetmanager.js"></script>
	<script src="scripts/util/camera.js"></script>
	<script src="scripts/util/map.js"></script>
	<script src="scripts/objects/gameobject.js"></script>
	<script src="scripts/objects/player.js"></script>
	<script src="scripts/objects/enemy.js"></script>
	<script src="scripts/objects/bullet.js"></script>
	<script src="scripts/objects/particle.js"></script>
	<script src="scripts/objects/powerups.js"></script>
	<script src="scripts/states/gamestate.js"></script>
	<script src="scripts/states/playingstate.js"></script>
	<script src="scripts/states/menustate.js"></script>
	<script src="scripts/game.js"></script>
	<script type="text/javascript">
	
		var ASSET_MANAGER = new AssetManager();
		var game;
		var gameCanvas;
	
		window.onload = function () {
			if(window.File && window.FileReader) {
				game = new Game();
				game.init(startCanvas());
				// Start Input
				startInput();
			}
			else {
				alert("Sorry, your browser doesn't support this application.");
			}
		}
					
		// INPUT HANDLER
		var keyPressed = {};
		var mousePressed;
		var mousePosition = new Array(2);
		function startInput() {
			window.addEventListener("keydown", function(e) {
				keyPressed[e.keyCode] = true;
			}, false);
			window.addEventListener("keyup", function(e) {
				keyPressed[e.keyCode] = false;
			}, false);
			window.addEventListener("mousemove", function(e) {
				mouseMoved(e.clientX, e.clientY);
			}, false);
			gameCanvas.addEventListener("mousedown", function(e) {
				mousePressed = true;
				mouseClicked(e.clientX, e.clientY);
			}, false);
			gameCanvas.addEventListener("mouseup", function(e) {
				mousePressed = false;
			}, false);
		}
		
		// MOUSE MOVED!!
		function mouseMoved(x, y) {
			mousePosition = [x, y];
		}
		// MOUSE CLICKED!!
		function mouseClicked(x, y) {
		}
		
		function startCanvas() {
			gameCanvas = document.getElementById("gameCanvas");
			var context = gameCanvas.getContext("2d");
			context.clearRect(0, 0, game.CANVAS_WIDTH, game.CANVAS_HEIGHT);
			return context;
		}
		
	</script>
</head>
<body>
	WASD - Move; Mouse Left Click: Shoot <br><br>
	<canvas id="gameCanvas" width="500px" height="500px" style="width:500px; height:500px"></canvas>
</body>
</html>
