require.config({
	baseUrl: '',
	paths: {
		jquery: 'js/libs/jquery-3.3.1.min',
		phaser: 'js/libs/phaser'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		phaser: {
			exports: 'Phaser'
		}
	}
});

require(['js/controllers/game'],
	function (Game) {
		var game = new Game();
	});