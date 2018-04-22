define(['phaser', 'js/models/System.js', 'js/models/SkillsHandler'],
	function (Phaser, System, SkillsHandler) {
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
				this.background = this.game.add.sprite(330, 20, 'background');

				this.buttonReturn = this.game.add.button(10, 653, 'buttonReturn', () => {
					this.game.state.start('Play', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				});

				// Texte affichant les Points
				this.pointDisplay = this.game.add.text(1145, 16, 'Points : ' + this.gameObject.point, {
					fontSize: '32px',
					fill: '#555'
				});


				this.system = new System(this.game);
				this.system.createFullScreen();

				this.SkillsHandler = new SkillsHandler(this.game, this.gameObject, this.skillsObject);
			},

			update: function () {
				this.pointDisplay.text = 'Points : ' + this.gameObject.point;
			}
		};

		return skills;
	});