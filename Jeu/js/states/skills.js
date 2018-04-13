define(['phaser', 'js/models/System.js', 'jquery'],
	function (Phaser, System, $) {
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

				this.skillsContainer = [];

				// Nettoyage de skillsContainer
				var clearSkillsContainer = function() {
					for(let child in this.skillsContainer) {
						this.skillsContainer[child].destroy();
					}
				}.bind(this);

				// Fonction de découverte de la compétence et affichage partiel de ses sous-compétences
				var discovery = function(skillClickTarget) {
					function search(values) {
						$.each(values, function(i, v) {
							if (v.name === skillClickTarget.name && v.debloque === 0) {
								// Découverte de la compétence
								v.debloque = 1;
								v.alpha = 1;
								if(v.hasOwnProperty('children')) {
									for(let child of v.children) {
										child.alpha = 0.7;
									}
								}
							}
							if (v.children) {
								search(v.children);
							}
						});
					}

					search(this.skillsObject);
					clearSkillsContainer();
					readJSON(this.skillsObject);
				};

				// Parcours récursif du JSON
				var readJSON = function(object) {
					for(let child of object) {
						if(child.hasOwnProperty('category')) {
							this.skillsContainer[child.name] = this.game.add.button(child.x, child.y, child.category);
							this.skillsContainer[child.name].alpha = child.alpha;
							this.skillsContainer[child.name].input.pixelPerfectOver = true;
							this.skillsContainer[child.name].input.pixelPerfectClick = true;
							this.skillsContainer[child.name].events.onInputDown.add(discovery.bind(this, child));
						}
						
						if(child.hasOwnProperty('children')) {
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
			}
		};

		return skills;
	});