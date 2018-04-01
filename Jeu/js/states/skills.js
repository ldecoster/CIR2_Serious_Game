define(['phaser', 'js/models/System.js'],
	function (Phaser, System) {
		var skills = function () {
			
		};

		skills.prototype = {
			init: function (configFromStates) {
				this.gameObject = JSON.parse(configFromStates);

			},

			preload: function () {
				
			},

			create: function () {				
				this.system = new System(this.game);
				this.system.createFullScreen();

			},

			update: function () {
				this.game.state.start('Play', true, false, JSON.stringify(this.gameObject));
			}
		};

		return skills;
	});