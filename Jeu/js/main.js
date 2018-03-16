require.config({
	baseUrl: '',
	paths: {
		phaser: 'js/libs/phaser'
	},
	shim: {
		phaser: {
			exports: 'Phaser'
		}
	}
});

require(['js/controllers/game', 'phaser'],
	function (Game, Phaser) {
		var game = new Game();
	});