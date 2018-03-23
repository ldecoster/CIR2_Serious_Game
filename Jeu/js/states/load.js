define([],
	function() {
		var load = function() {

		};

		load.prototype = {
			preload: function() {

			},

			create: function() {
				this.game.state.start('Menu');
			},

			update: function() {

			}
		};

		return load;
	});