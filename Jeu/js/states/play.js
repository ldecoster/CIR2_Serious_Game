define(['phaser', 'js/models/Bar.js', 'js/models/Timer.js', 'js/models/color.js'],
	function (Phaser, Bar, Timer, color) {
		var play = function () {
		};

		play.prototype = {
			init: function (configFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
			},

			preload: function () {
				// Images de la carte
				for(let i = 1; i <= 6; i++) {
					this.game.load.image(this.gameObject.mapName+i, this.gameObject.mapNamePath+i+'.png');
					this.game.load.image(this.gameObject.mapName+i+'P', this.gameObject.mapNamePath+i+'_pollute.png');
					this.game.load.image(this.gameObject.mapName+i+'S', this.gameObject.mapNamePath+i+'_safe.png');
				}
				// Images de la barre de notifications et indication de notifications
				this.game.load.image('buttonBackground', 'assets/img/button_background.png');
				this.game.load.image('buttonNotification', 'assets/img/button_mission_notification.png');

				// Images des boutons cliquables
				this.game.load.spritesheet('buttonMissions', 'assets/img/button_mission.png');
				this.game.load.spritesheet('buttonSkills', 'assets/img/button_skills.png');
				this.game.load.spritesheet('buttonStats', 'assets/img/button_stats.png');
			},

			create: function () {	
				this.game.stage.backgroundColor = this.gameObject.backgroundColor;

				this.mapContainer = [];

				// On ajout les 3 versions de chaque subdivision de la carte et on initialise leur .alpha
				for(let mapPartObject of this.gameObject.mapParts) {
					this.mapContainer[mapPartObject.name] = this.game.add.image(0, 0, mapPartObject.name);
					this.mapContainer[mapPartObject.name].alpha = mapPartObject.alpha;
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

				// Création du chronomètre
				this.timer = new TimerController(this.game, this.gameObject.remainingTime);
				
				// Création de la barre de pollution
				this.pollutionBar = new BarController(this.game, this.gameObject.barParam);
				this.pollutionBar.printPercentage();
			},

			update: function () {

				if(this.pollutionBar.PV < this.pollutionBar.pvmax) {
					//this.pollutionBar.addPV(1);
				}
				if(this.pollutionBar.PV > 0) {
					this.pollutionBar.removePV(1);
				}



				// Si le taux de pollution atteint 0, on déclenche l'état de victoire
				if(this.pollutionBar.PV === 0) {
					//this.game.state.start('Skills', true, false, JSON.stringify(this.gameObject));
					//this.game.state.start('Win');
				}
			}
		};


		return play;
	});