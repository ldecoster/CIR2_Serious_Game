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

require(['phaser', 'js/states/boot', 'js/states/load', 'js/states/menu', 'js/states/play', 'js/states/skills', 'js/states/missions', 'js/states/stats', 'js/states/win', 'js/states/defeat'],
	function (Phaser, boot, load, menu, play, skills, missions, stats, win, defeat) {
		var jeu = function (htmlFrame) {
			var game = new Phaser.Game(1350, 750, Phaser.AUTO, htmlFrame, {});

			game.state.add('Boot', boot);
			game.state.add('Load', load);
			game.state.add('Menu', menu);
			game.state.add('Play', play);
			game.state.add('Skills', skills);
			game.state.add('Missions', missions);
			game.state.add('Stats', stats);
			game.state.add('Win', win);
			game.state.add('Defeat', defeat);

			game.state.start('Boot');

		};
		
		jeu('game');
	});