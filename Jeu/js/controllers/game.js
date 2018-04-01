define(['phaser', 'js/states/boot', 'js/states/load', 'js/states/menu', 'js/states/play', 'js/states/skills', 'js/states/win'],
	function (Phaser, boot, load, menu, play, skills, win) {

		var jeu = function (htmlFrame) {
			var game = new Phaser.Game(1350, 750, Phaser.AUTO, htmlFrame, {});

			game.state.add('Boot', boot);
			game.state.add('Load', load);
			game.state.add('Menu', menu);
			game.state.add('Play', play);
			game.state.add('Skills', skills);
			game.state.add('Win', win);

			game.state.start('Boot');

		};
		return jeu;
	});