define(['js/models/System.js'],
	function (System) {
		var boot = function () {
		};

		boot.prototype = {
			preload: function () {

			},

			create: function () {
				this.system = new System(this.game);
				this.system.createFullScreen();
				this.game.state.start('Load');
			}
		};
		return boot;
	});