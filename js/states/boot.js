define([],
	function () {
		var boot = function () {
		};

		boot.prototype = {
			preload: function () {

			},

			create: function () {
				this.game.state.start('Load');
			}
		};
		return boot;
	});