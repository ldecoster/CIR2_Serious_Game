define(['phaser', 'js/models/Bar.js', 'js/models/System.js', 'js/models/color.js'],
	function (Phaser, Bar, System, color) {
		var play = function () {
		};

		play.prototype = {
			init: function (configFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
			},

			preload: function () {
				this.game.stage.backgroundColor = this.gameObject.backgroundColor;

				// Images de la carte
				for(let i = 1; i <= 6; i++) {
					this.game.load.image(this.gameObject.mapName+i, this.gameObject.mapNamePath+i+'.png');
					this.game.load.image(this.gameObject.mapName+i+'P', this.gameObject.mapNamePath+i+'_pollute.png');
					this.game.load.image(this.gameObject.mapName+i+'S', this.gameObject.mapNamePath+i+'_safe.png');
				}
				// Images de la barre de notifications et indication de notifications
				this.game.load.image('buttonBackground', 'assets/img/interface/button_background.png');
				this.game.load.image('buttonNotification', 'assets/img/interface/button_mission_notification.png');

				// Images des boutons cliquables
				this.game.load.spritesheet('buttonMissions', 'assets/img/interface/button_mission.png');
				this.game.load.spritesheet('buttonSkills', 'assets/img/interface/button_skills.png');
				this.game.load.spritesheet('buttonStats', 'assets/img/interface/button_stats.png');
			},

			create: function () {	

				this.mapContainer = [];

				// On ajout les 3 versions de chaque subdivision de la carte et on initialise leur .alpha
				for(let mapPartObject of this.gameObject.mapParts) {
					this.mapContainer[mapPartObject.name] = this.game.add.image(0, 0, mapPartObject.name);
					this.mapContainer[mapPartObject.name].alpha = mapPartObject.alpha;
				}

				this.buttonBackground = this.game.add.image(28, 653, 'buttonBackground');
				this.buttonNotification = this.game.add.image(795, 608, 'buttonNotification');
				this.buttonNotification.alpha = 0;

				this.buttonSkills = this.game.add.button(1006, 653, 'buttonSkills', function() {
					this.game.state.start('Skills', true, false, JSON.stringify(this.gameObject));
				}, this);

				// Fonction à changer après
				this.buttonMissions = this.game.add.button(579, 620, 'buttonMissions', function() {
					
				});

				this.buttonStats = this.game.add.button(10, 653, 'buttonStats', function() {
					colorswap(this.mapContainer.frZo1, this.mapContainer.frZo1P, this.mapContainer.frZo1S, false);
					colorswap(this.mapContainer.frZo2, this.mapContainer.frZo2P, this.mapContainer.frZo2S, false);
					colorswap(this.mapContainer.frZo3, this.mapContainer.frZo3P, this.mapContainer.frZo3S, false);
					colorswap(this.mapContainer.frZo4, this.mapContainer.frZo4P, this.mapContainer.frZo4S, false);
					colorswap(this.mapContainer.frZo5, this.mapContainer.frZo5P, this.mapContainer.frZo5S, false);
					colorswap(this.mapContainer.frZo6, this.mapContainer.frZo6P, this.mapContainer.frZo6S, false);
				}, this);

				// Création du chronomètre
				this.system = new System(this.game);
				this.system.createFullScreen();
				this.system.createTimer(this.gameObject.remainingTime);
				
				// Création de la barre de pollution
				this.pollutionBar = new BarController(this.game, this.gameObject.barParam);
				this.pollutionBar.printPercentage();
			},

			update: function () {

				if(this.pollutionBar.PV > 0) {
					this.pollutionBar.removePV(1);
				}

				// Si le temps est écoulé ou si le le taux de pollution atteint 100, on déclenche l'état de défaite
				if((this.pollutionBar.PV === this.pollutionBar.pvmax) || (this.system.getClock() === 0)) {
					this.game.state.start('Defeat');
				}

				// Si le taux de pollution atteint 0, on déclenche l'état de victoire
				if(this.pollutionBar.PV === 0) {
					//this.game.state.start('Win');
				}
			}
		};


		return play;
	});