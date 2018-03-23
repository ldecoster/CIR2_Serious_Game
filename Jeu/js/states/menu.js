define([],
	function() {
		var menu = function() {

		};

		menu.prototype = {
			preload: function() {

			},

			create: function() {
				this.game.state.start('Play');
			},

			update: function() {
				
			}
		};

		return menu;
	});