define(['phaser', 'js/models/Bar.js', 'js/models/System.js', 'js/models/color.js'],
	function (Phaser, Bar, System, color) {
		var play = function () {
		};

		play.prototype = {
			init: function (configFromStates, mapsFromStates, skillsFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
				this.mapsObject = JSON.parse(mapsFromStates);
				this.skillsObject = JSON.parse(skillsFromStates);
			},

			create: function () {	

				// On ajout les 3 versions de chaque subdivision de la carte et on initialise leur .alpha
				this.mapContainer = [];				
				for(let mapPartObject of this.mapsObject) {
					this.mapContainer[mapPartObject.name] = this.game.add.image(0, 0, mapPartObject.name);
					this.mapContainer[mapPartObject.name].alpha = mapPartObject.alpha;
				}

				this.buttonBackground = this.game.add.image(28, 653, 'buttonBackground');
				this.buttonNotification = this.game.add.image(795, 608, 'buttonNotification');
				this.buttonNotification.alpha = 0;

				this.buttonSkills = this.game.add.button(1006, 653, 'buttonSkills', function() {
					clearInterval(this.pointCounter);
					this.game.state.start('Skills', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				}, this);

				// Fonction à changer après
				this.buttonMissions = this.game.add.button(579, 620, 'buttonMissions', function() {});

				this.buttonStats = this.game.add.button(10, 653, 'buttonStats', function() {
					colorswap(this.mapContainer.frZo1, this.mapContainer.frZo1P, this.mapContainer.frZo1S, false);
					colorswap(this.mapContainer.frZo2, this.mapContainer.frZo2P, this.mapContainer.frZo2S, false);
					colorswap(this.mapContainer.frZo3, this.mapContainer.frZo3P, this.mapContainer.frZo3S, false);
					colorswap(this.mapContainer.frZo4, this.mapContainer.frZo4P, this.mapContainer.frZo4S, false);
					colorswap(this.mapContainer.frZo5, this.mapContainer.frZo5P, this.mapContainer.frZo5S, false);
					colorswap(this.mapContainer.frZo6, this.mapContainer.frZo6P, this.mapContainer.frZo6S, false);
				}, this);


				// On récupère tous les skills présents dans le JSON afin de faciliter les calculs
				getAllSkills = () => {
					var skillsContainer = [];
					// Parcours récursif du JSON
					var readJSON = object => {
						for(let child of object) {
							skillsContainer.push(child);
							if(child.hasOwnProperty('children')) {
								readJSON(child.children);
							}
						}
					};
					readJSON(this.skillsObject);
					return skillsContainer;
				};
				this.skillsContainer = getAllSkills();

				//console.log(this.skillsContainer.find(x => x.name === "transEnerg"));

				this.pointCounter = setInterval(() => {
					if(this.gameObject.tempsPoint === 20) {
						this.gameObject.point += 5;
						this.gameObject.tempsPoint = 0;
					} else {
						this.gameObject.tempsPoint++;
					}
					console.log(this.gameObject.point + ' / ' + this.gameObject.tempsPoint);
				}, 1000);

				// Création du chronomètre
				this.system = new System(this.game);
				this.system.createFullScreen();
				this.system.createTimer(this.gameObject.remainingTime);
				
				// Création de la barre de pollution
				this.pollutionBar = new BarController(this.game, this.gameObject.barParam);
				this.pollutionBar.printPercentage();
			},

			update: function () {
				this.gameObject.remainingTime = this.system.getClock();

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