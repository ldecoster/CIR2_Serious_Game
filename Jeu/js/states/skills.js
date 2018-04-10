define(['phaser', 'js/models/System.js', 'text!assets/json/skills.json'],
	function (Phaser, System, skillsFromFile) {
		var skills = function () {
		};

		skills.prototype = {
			init: function (configFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
				this.skillsObject = JSON.parse(skillsFromFile);
			},

			preload: function () {
				// Création de l'anneau central
				this.game.load.image('transEnerg', 'assets/img/skills_tree/arc_transition_energetique.png');
				this.game.load.image('campInfl', 'assets/img/skills_tree/arc_campagne_influence.png');
				this.game.load.image('energPol', 'assets/img/skills_tree/arc_energie_polluante.png');
				this.game.load.image('background', 'assets/img/skills_tree/Background.png');

				// Ajout des compétences débloquables
				this.game.load.spritesheet('greenBullet', 'assets/img/skills_tree/bullet_transition_energetique.png');
				this.game.load.spritesheet('orangeBullet', 'assets/img/skills_tree/bullet_campagne_influence.png');
				this.game.load.spritesheet('redBullet', 'assets/img/skills_tree/bullet_energie_polluante.png');
			},

			create: function () {				
				this.system = new System(this.game);
				this.system.createFullScreen();

				this.game.stage.backgroundColor = '#141414';

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
			},

			update: function () {
				//setTimeout(function() {
				//	this.game.state.start('Play', true, false, JSON.stringify(this.gameObject));
				//}.bind(this), 5000);
			}
		};

		return skills;
	});