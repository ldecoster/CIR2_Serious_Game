require.config({
	baseUrl: '',
	paths: {
		text: 'js/libs/text',
		phaser: 'js/libs/phaser'
	},
	shim: {
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
		var game = new Game();
	});