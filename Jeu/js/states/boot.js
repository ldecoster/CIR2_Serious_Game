define([],
	function () {
		var boot = function () {
		};

		boot.prototype = {
			preload: function () {
				this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
				this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			},

			create: function () {
				this.game.state.start('Load');
			}
		};
		return boot;
	});