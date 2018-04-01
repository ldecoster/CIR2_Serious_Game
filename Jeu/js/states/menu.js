define(['js/models/System.js', 'text!assets/json/config.json'],
	function(System, configFromFile) {
		var menu = function() {

		};

		menu.prototype = {
			preload: function() {

			},

			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();
				this.game.state.start('Play', true, false, configFromFile);
			},

			update: function() {
				
			}
		};

		return menu;
	});