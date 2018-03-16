(function() {
	this.game = new Phaser.Game(1350, 750, Phaser.AUTO, '', { preload:preload, create:create, update:update });

	const MAP = 'frZo';
	const MAP_PATH = 'assets/img/france_zone';
	const REMAINING_TIME = 300;

	function preload() {
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		// Images de la carte
		for(let i = 1; i <= 6; i++) {
			this.game.load.image(MAP+i, MAP_PATH+i+'.png');
			this.game.load.image(MAP+i+'P', MAP_PATH+i+'_pollute.png');
			this.game.load.image(MAP+i+'S', MAP_PATH+i+'_safe.png');
		}
		// Images de la barre de notifications et indication de notifications
		this.game.load.image('buttonBackground', 'assets/img/button_background.png');
		this.game.load.image('buttonNotification', 'assets/img/button_mission_notification.png');

		// Images des boutons cliquables
		this.game.load.spritesheet('buttonMissions', 'assets/img/button_mission.png');
		this.game.load.spritesheet('buttonSkills', 'assets/img/button_skills.png');
		this.game.load.spritesheet('buttonStats', 'assets/img/button_stats.png');
	}

	function create() {
		/*
			Affichage des images
		 */
		this.game.stage.backgroundColor = '#141414';
		this.mapContainer = [];
		for(let i = 1; i <= 6; i++) {
			this.mapContainer['frZo'+i] = this.game.add.image(0, 0, 'frZo'+i);
			this.mapContainer['frZo'+i+'P'] = this.game.add.image(0, 0, 'frZo'+i+'P');
			this.mapContainer['frZo'+i+'S'] = this.game.add.image(0, 0, 'frZo'+i+'S');
		}
		this.buttonBackground = this.game.add.image(28, 653, 'buttonBackground');
		this.buttonMissions = this.game.add.button(579, 620, 'buttonMissions');
		this.buttonNotification = this.game.add.image(795, 608, 'buttonNotification');
		this.buttonNotification.alpha = 0;

		this.buttonSkills = this.game.add.button(1006, 653, 'buttonSkills', function() {
			colorswap(this.mapContainer.frZo1, this.mapContainer.frZo1P, this.mapContainer.frZo1S, true);
			colorswap(this.mapContainer.frZo2, this.mapContainer.frZo2P, this.mapContainer.frZo2S, true);
			colorswap(this.mapContainer.frZo3, this.mapContainer.frZo3P, this.mapContainer.frZo3S, true);
			colorswap(this.mapContainer.frZo4, this.mapContainer.frZo4P, this.mapContainer.frZo4S, true);
			colorswap(this.mapContainer.frZo5, this.mapContainer.frZo5P, this.mapContainer.frZo5S, true);
			colorswap(this.mapContainer.frZo6, this.mapContainer.frZo6P, this.mapContainer.frZo6S, true);
		}, this);
		this.buttonStats = this.game.add.button(10, 653, 'buttonStats', function() {
			colorswap(this.mapContainer.frZo1, this.mapContainer.frZo1P, this.mapContainer.frZo1S, false);
			colorswap(this.mapContainer.frZo2, this.mapContainer.frZo2P, this.mapContainer.frZo2S, false);
			colorswap(this.mapContainer.frZo3, this.mapContainer.frZo3P, this.mapContainer.frZo3S, false);
			colorswap(this.mapContainer.frZo4, this.mapContainer.frZo4P, this.mapContainer.frZo4S, false);
			colorswap(this.mapContainer.frZo5, this.mapContainer.frZo5P, this.mapContainer.frZo5S, false);
			colorswap(this.mapContainer.frZo6, this.mapContainer.frZo6P, this.mapContainer.frZo6S, false);
		}, this);

		/*
			Affichage des autres éléments (Timer et Barre de Pollution)
		 */
		this.timer = new TimerController(this.game, REMAINING_TIME);
		this.barParam = {
			name: 'pollution',
			speedDecrease: 100,
			coordX: 360,
			coordY: 690,
			PVMax: 100,
			PV: 95,
			barWidth: 626,
			barHeight: 30
		};
		this.bar = new BarController(this.game, this.barParam);
		this.bar.printPercentage();
	}

	function update() {
		if(this.bar.PV > 0.0) {
			this.bar.removePV(0.2);
		}
	}
	
})();