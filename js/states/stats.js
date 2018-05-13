define(['phaser', 'js/models/System.js'],
	function (Phaser, System) {
		var stats = function () {
		};

		stats.prototype = {
			init: function (configFromStates, mapsFromStates, skillsFromStates) {
				// On récupère les informations depuis le JSON
				this.gameObject = JSON.parse(configFromStates);
				this.mapsObject = JSON.parse(mapsFromStates);
				this.skillsObject = JSON.parse(skillsFromStates);
			},

			create: function () {
				this.buttonReturn = this.game.add.button(10, 653, 'buttonReturn', () => {
					this.game.state.start('Play', true, false, JSON.stringify(this.gameObject), JSON.stringify(this.mapsObject), JSON.stringify(this.skillsObject));
				}, this, 1, 0);

				this.board = this.game.add.sprite(0, 40, 'board');

				this.statsDisplay = this.game.add.text(300, 100, '- La partie se finit au bout de', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(650, 100, '5 minutes', {fontSize: '25px', fill: '#ff0000'})+
									this.game.add.text(300, 130, '- Vous gagnez 1 point de compétence toutes les', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(875, 130, '3 secondes', {fontSize: '25px', fill: '#ff0000'})+
									this.game.add.text(300, 160, '- Ils servent à acheter des améliorations dans', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(850, 160, '\'Compétences\'', {fontSize: '25px', fill: '#0055ff'})+
									this.game.add.text(300, 190, '- Les améliorations aident à', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(640, 190, 'la transition énergétique', {fontSize: '25px', fill: '#00ff00'})+
									this.game.add.text(300, 220, '- Elle sert à diminuer le', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(580, 220, 'taux de pollution', {fontSize: '25px', fill: '#ff00ff'})+
									this.game.add.text(300, 250, '- S\'il atteint 100%, le jeu se finit', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(300, 280, '- Des points bonus sont gagnables grâce aux', {fontSize: '25px', fill: '#ffffff'})+
									this.game.add.text(850, 280, '\'Missions\'', {fontSize: '25px', fill: '#0055ff'});


				this.system = new System(this.game);
				this.system.createFullScreen();
			},

			update: function () {
			}
		};

		return stats;
	});