define(['phaser'],
	function (Phaser) {
		var skills = function () {
			
		};

		skills.prototype = {
			init: function (configFromStates) {
				this.gameObject = JSON.parse(configFromStates);

			},

			preload: function () {
				
			},

			create: function () {				
				

			},

			update: function () {
				this.game.state.start('Play', true, false, JSON.stringify(this.gameObject));
			}
		};

		return skills;
	});