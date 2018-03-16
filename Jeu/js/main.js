(function() {
	var game = new Phaser.Game(1350, 750, Phaser.AUTO, '', { preload:preload, create:create, upload:upload });
	const MAP = 'frZo';
	const MAP_PATH = 'assets/img/france_zone';


	function preload() {
		// Images de la carte
		for(let i = 1; i <= 6; i++) {
			game.load.image(MAP+i, MAP_PATH+i+'.png');
			game.load.image(MAP+i+'P', MAP_PATH+i+'_pollute.png');
			game.load.image(MAP+i+'S', MAP_PATH+i+'_safe.png');
		}
		// Images de la barre de notifications et indication de notifications
		game.load.image('buBa', 'assets/img/button_background.png');
		game.load.image('buMiNo', 'assets/img/button_mission_notification.png');

		// Images des boutons cliquables
		game.load.spritesheet('buMi', 'assets/img/button_mission.png');
		game.load.spritesheet('buSk', 'assets/img/button_skills.png');
		game.load.spritesheet('buSt', 'assets/img/button_stats.png');
	}

	function create() {
		game.stage.backgroundColor = '#141414';
		var mapContainer = [];
		for(let i = 1; i <= 6; i++) {
			mapContainer['frZo'+i] = game.add.image(0, 0, 'frZo'+i);
			mapContainer['frZo'+i+'P'] = game.add.image(0, 0, 'frZo'+i+'P');
			mapContainer['frZo'+i+'S'] = game.add.image(0, 0, 'frZo'+i+'S');
		}

		var buBa = game.add.sprite(28, 653, 'buBa');
		var buMi = game.add.button(579, 620, 'buMi');
		var buSk = game.add.button(1006, 653, 'buSk', function() {
			colorswap(mapContainer.frZo1, mapContainer.frZo1P, mapContainer.frZo1S, true);
			colorswap(mapContainer.frZo2, mapContainer.frZo2P, mapContainer.frZo2S, true);
			colorswap(mapContainer.frZo3, mapContainer.frZo3P, mapContainer.frZo3S, true);
			colorswap(mapContainer.frZo4, mapContainer.frZo4P, mapContainer.frZo4S, true);
			colorswap(mapContainer.frZo5, mapContainer.frZo5P, mapContainer.frZo5S, true);
			colorswap(mapContainer.frZo6, mapContainer.frZo6P, mapContainer.frZo6S, true);
		}, this);
		var buSt = game.add.button(10, 653, 'buSt', function() {
			colorswap(mapContainer.frZo1, mapContainer.frZo1P, mapContainer.frZo1S, false);
			colorswap(mapContainer.frZo2, mapContainer.frZo2P, mapContainer.frZo2S, false);
			colorswap(mapContainer.frZo3, mapContainer.frZo3P, mapContainer.frZo3S, false);
			colorswap(mapContainer.frZo4, mapContainer.frZo4P, mapContainer.frZo4S, false);
			colorswap(mapContainer.frZo5, mapContainer.frZo5P, mapContainer.frZo5S, false);
			colorswap(mapContainer.frZo6, mapContainer.frZo6P, mapContainer.frZo6S, false);
		}, this);

		// À rajouter après les autres boutons pour être par-dessus
		var buMiNo = game.add.sprite(795, 608, 'buMiNo');

		var timer = new TimerController(game, 500);
		var barParam = {
			name: 'pollution',
			speedDecrease: 100,
			coordX: 360,
			coordY: 690,
			PVMax: 100,
			PV: 95,
			barWidth: 646,
			barHeight: 30
		};
		var bar = new BarController(game, barParam);
		bar.printPercentage();
	}

	function upload() {
		timer.updateClock();
		bar.removePV(5);
	}
	
})();