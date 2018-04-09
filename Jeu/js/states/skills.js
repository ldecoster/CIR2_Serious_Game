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
				this.game.load.spritesheet('transEnergComp', 'assets/img/skills_tree/bullet_transition_energetique.png');
				this.game.load.spritesheet('campInflComp', 'assets/img/skills_tree/bullet_campagne_influence.png');
				this.game.load.spritesheet('energPolComp', 'assets/img/skills_tree/bullet_energie_polluante.png');
			},

			create: function () {				
				this.system = new System(this.game);
				this.system.createFullScreen();

				this.game.stage.backgroundColor = '#141414';

				var background = this.game.add.sprite(330, 20, 'background');
				var transEnerg = this.game.add.sprite(655, 220, 'transEnerg');
				var campInfl = this.game.add.sprite(536, 220, 'campInfl');
				var energPol = this.game.add.sprite(530, 317, 'energPol');

				this.skillsContainer = [];

				for(let transEnergChildren of this.skillsObject.transEnerg) {
					this.skillsContainer.push(this.game.add.button(transEnergChildren.x, transEnergChildren.y, 'transEnergComp'));
				}
				for(let campInflChildren of this.skillsObject.campInfl) {
					this.skillsContainer.push(this.game.add.button(campInflChildren.x, campInflChildren.y, 'campInflComp'));
				}
				for(let energPolChildren of this.skillsObject.energPol) {
					this.skillsContainer.push(this.game.add.button(energPolChildren.x, energPolChildren.y, 'energPolComp'));
				}
			},

			update: function () {
				//setTimeout(function() {
				//	this.game.state.start('Play', true, false, JSON.stringify(this.gameObject));
				//}.bind(this), 5000);
			}
		};

		return skills;
	});