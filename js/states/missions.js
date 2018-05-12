define(['phaser'],
	function (Phaser) {
		var missions = function () {
		};

		missions.prototype = {
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
			},

			update: function () {
			}
		};

		return missions;
	});