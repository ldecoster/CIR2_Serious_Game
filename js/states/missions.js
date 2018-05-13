define(['phaser', 'js/models/System.js'],
	function (Phaser, System) {
		var missions = function () {
		};

		missions.prototype = {
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

				this.policier = this.game.add.sprite(100, 428, 'policier');
				this.bulle = this.game.add.sprite(200, 10, 'bulle');

				this.missionDisplay = this.game.add.text(270, 100, '- Débloquer toutes les compétences', {fontSize: '25px', fill: '#000000'})+
									  this.game.add.text(705, 100, 'rouges', {fontSize: '25px', fill: '#ff0000'})+
									  this.game.add.text(270, 130, '- Débloquer toutes les compétences', {fontSize: '25px', fill: '#000000'})+
									  this.game.add.text(705, 130, 'vertes', {fontSize: '25px', fill: '#00ff00'})+
									  this.game.add.text(270, 160, '- Débloquer toutes les compétences', {fontSize: '25px', fill: '#000000'})+
									  this.game.add.text(705, 160, 'orange', {fontSize: '25px', fill: '#ffa500'})+
									  this.game.add.text(270, 190, '- Débloquer toutes les compétences', {fontSize: '25px', fill: '#000000'});

				this.system = new System(this.game);
				this.system.createFullScreen();
			},

			update: function () {

			}
		};

		return missions;
	});