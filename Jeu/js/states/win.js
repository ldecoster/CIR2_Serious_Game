define(['js/models/System.js'],
	function(System) {
		var win = function() {

		};

		win.prototype = {
			preload: function() {

			},

			create: function() {
				this.system = new System(this.game);
				this.system.createFullScreen();
				console.log('Gagné !!!');
			},

			update: function() {

			}
		};

		return win;
	});