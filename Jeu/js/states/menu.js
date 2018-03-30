define(['text!assets/json/config.json'],
	function(configFromFile) {
		var menu = function() {

		};

		menu.prototype = {
			preload: function() {

			},

			create: function() {
				this.game.state.start('Play', true, false, configFromFile);
			},

			update: function() {
				
			}
		};

		return menu;
	});