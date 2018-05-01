define(['phaser', 'js/models/Bar.js', 'js/models/System.js', 'js/models/color.js', 'js/models/SkillsHandler'],
	function (Phaser, Bar, System, color, SkillsHandler) {
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
				/* Niveau facile mis par défaut */
				this.pollutionGoal = this.gameObject.levels[0].winPercentage;

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
					clearInterval(this.counter);
					this.gameObject.barParam.PV = this.pollutionBar.getPV();
					this.game.state.start('Skills', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				}, this, 0, 1);

				this.buttonMissions = this.game.add.button(579, 620, 'buttonMissions', function() {});

				this.buttonStats = this.game.add.button(10, 653, 'buttonStats', function() {
					colorswap(this.mapContainer.frZo1, this.mapContainer.frZo1P, this.mapContainer.frZo1S, false);
					colorswap(this.mapContainer.frZo2, this.mapContainer.frZo2P, this.mapContainer.frZo2S, false);
					colorswap(this.mapContainer.frZo3, this.mapContainer.frZo3P, this.mapContainer.frZo3S, false);
					colorswap(this.mapContainer.frZo4, this.mapContainer.frZo4P, this.mapContainer.frZo4S, false);
					colorswap(this.mapContainer.frZo5, this.mapContainer.frZo5P, this.mapContainer.frZo5S, false);
					colorswap(this.mapContainer.frZo6, this.mapContainer.frZo6P, this.mapContainer.frZo6S, false);
				}, this, 0, 1);


				// Texte affichant les Points
				this.pointDisplay = this.game.add.text(1145, 16, 'Points : ' + this.gameObject.point, {
					fontSize: '32px',
					fill: '#555'
				});

				// Création du chronomètre
				this.system = new System(this.game);
				this.system.createFullScreen();
				this.system.createTimer(this.gameObject.remainingTime);
				
				// Création de la barre de pollution
				this.pollutionBar = new BarController(this.game, this.gameObject.barParam);
				this.pollutionBar.printPercentage();

				this.skillsHandler = new SkillsHandler(this.game, this.gameObject, this.skillsObject);
			
				// Augmente le taux de pollution si certaines compétences ne sont pas débloquées
				var handlePollution = () => {
					if(this.skillsHandler.searchSkill('nucleaire').debloque === 0) {
						this.pollutionBar.addPV(0.5);
					} else {
						let nuc = this.skillsHandler.searchSkill('entretien').debloque + this.skillsHandler.searchSkill('destruction').debloque + this.skillsHandler.searchSkill('recyclDechet').debloque;
						if(nuc === 0) {
							this.pollutionBar.addPV(0.7);	
						}
					}
				};

				// Incrémentation automatique des points et du taux de pollution
				this.counter = setInterval(() => {
					if(this.gameObject.tempsPoint === 10) {
						handlePollution();
					} else if(this.gameObject.tempsPoint === 20) {
						handlePollution();
						this.gameObject.point += 5;
						this.gameObject.tempsPoint = 0;
					}
					this.gameObject.tempsPoint++;
				}, 1000);
			},

			update: function () {
				this.gameObject.remainingTime = this.system.getClock();

				this.pointDisplay.text = 'Points : ' + this.gameObject.point;

				// Si le temps est écoulé ou si le le taux de pollution atteint 100, on déclenche l'état de défaite
				if((this.pollutionBar.PV === this.pollutionBar.pvmax) || (this.system.getClock() === 0)) {
					this.game.state.start('Defeat');
				}

				// Si le taux de pollution atteint l'objectif, on déclenche l'état de victoire
				if(this.pollutionBar.PV === this.pollutionGoal) {
					this.game.state.start('Win');
				}
			}
		};

		return play;
	});