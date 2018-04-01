define(['js/models/System.js'],
	function(System) {
		var load = function() {

		};

		load.prototype = {
			preload: function() {

			},

			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();
				this.game.state.start('Menu');
			},

			update: function() {

			}
		};

		return load;
	});