define(['phaser'],
	function (Phaser) {
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

				this.missionDisplay = this.game.add.text(270, 100, '° Débloquer toutes les compétences rouges', {fontSize: '25px', fill: '#000000'})+
									  this.game.add.text(270, 130, '° Débloquer toutes les compétences vertes', {fontSize: '25px', fill: '#000000'})+
									  this.game.add.text(270, 160, '° Débloquer toutes les compétences orange', {fontSize: '25px', fill: '#000000'})+
									  this.game.add.text(270, 190, '° Débloquer toutes les compétences', {fontSize: '25px', fill: '#000000'});

			},

			update: function () {

			}
		};

		return missions;
	});