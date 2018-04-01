require.config({
	baseUrl: '',
	paths: {
		jquery: 'js/libs/jquery-3.3.1.min',
		text: 'js/libs/text',
		phaser: 'js/libs/phaser'
	},
	shim: {
		jquery: {
			exports: '$'
		},
		text: {
			exports: 'text'
		},
		phaser: {
			exports: 'Phaser'
		}
	}
});

require(['js/controllers/game'],
	function (Game) {
		var game = new Game('game');
	});