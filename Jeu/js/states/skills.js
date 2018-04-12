define(['phaser', 'js/models/System.js'],
	function (Phaser, System) {
		var skills = function () {
		};

		skills.prototype = {
			init: function (configFromStates, mapsFromStates, skillsFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
				this.mapsObject = JSON.parse(mapsFromStates);
				this.skillsObject = JSON.parse(skillsFromStates);
			},

			create: function () {
				this.system = new System(this.game);
				this.system.createFullScreen();

				var background = this.game.add.sprite(330, 20, 'background');
				var transEnerg = this.game.add.sprite(655, 220, 'transEnerg');
				var campInfl = this.game.add.sprite(536, 220, 'campInfl');
				var energPol = this.game.add.sprite(530, 317, 'energPol');

				this.skillsContainer = {};

				// Fonction de découverte des sous-compétences
				var discovery = function(element) {
					// Si l'élément a des enfants, on change la valeur de la propriété alpha à 1 et on actualise
					if(element.hasOwnProperty('children')) {
						for(let child of element.children) {
							child.alpha = 1;
						}
						readJSON(this.skillsObject);
					}
				};

				// Parcours récursif du JSON
				var readJSON = function(object) {
					for(let child of object) {
						if(child.hasOwnProperty('category')) {
							this.skillsContainer[child.name] = this.game.add.button(child.x, child.y, child.category);
							this.skillsContainer[child.name].alpha = child.alpha;
						}
						
						if(child.hasOwnProperty('children')) {
							if(child.hasOwnProperty('category')) {
								this.skillsContainer[child.name].events.onInputDown.add(discovery.bind(this, child));
							}
							readJSON(child.children);
						}
					}
				}.bind(this);

				readJSON(this.skillsObject);

				this.temp = 0;
			},

			update: function () {
				this.temp++;
				if(this.temp === 100) {
					this.game.state.start('Play', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				}
				//setTimeout(function() {
				//	this.game.state.start('Play', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				//}.bind(this), 5000);
			}
		};

		return skills;
	});