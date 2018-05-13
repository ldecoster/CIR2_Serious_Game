define(['phaser', 'js/models/System.js'],
	function (Phaser, System) {
		var stats = function () {
		};

		stats.prototype = {
			init: function (configFromStates, mapsFromStates, skillsFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
				this.mapsObject = JSON.parse(mapsFromStates);
				this.skillsObject = JSON.parse(skillsFromStates);
			},

			create: function () {
				this.buttonReturn = this.game.add.button(10, 653, 'buttonReturn', () => {
					this.game.state.start('Play', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				}, this, 1, 0);

				this.system = new System(this.game);
				this.system.createFullScreen();
			},

			update: function () {
			}
		};

		return stats;
	});